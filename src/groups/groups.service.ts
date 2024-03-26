import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Group, GroupDocument} from "./schemas/group.schema";
import {Model, Types} from "mongoose";
import {UsersService} from "../users/users.service";
import {FilterGroupDto} from "./dto/filter-group.dto";
import {Role} from "../auth/roles/roles.enum";
import {IsMongoId} from "class-validator";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    private readonly usersService: UsersService) {
  }

  async create(dto: CreateGroupDto) {
    const teacher = await this.usersService.findById(dto.teacherId);
    if (!teacher || teacher?.role !== Role.Teacher)
      throw new NotFoundException('teacher not found');

    this.checkDateRanges(dto.startDate, dto.endDate);

    const group = await this.groupModel.create(dto);
    await this.usersService.addGroupToTeacher({
      teacherId: teacher._id,
      groupId: group._id
    })
    return group;
  }

  async find(filter: FilterGroupDto) {
    const groups = await this.groupModel.find({
      name: new RegExp(filter.name, 'i'),
      teacherId: filter.teacherId ?? undefined
    }).populate({
      path: 'students',
      select: {_id: 1, fullName: 1, username: 1}
    })
    return groups;
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id must be a mongodb object id')
    }
    const group = await this.groupModel.findOne({
      _id: new Types.ObjectId(id)
    }).populate('students', {
      _id: 1,
    })
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async addStudent(data: {
    groupId: Types.ObjectId,
    studentId: Types.ObjectId
  }) {
    const group = await this.groupModel.findOne({_id: data.groupId});
    if (!group) throw new NotFoundException('Group not found');
    group.students.push(data.studentId);
    await group.save();
  }

  private checkDateRanges(startDate: string, endDate: string) {
    let date1 = new Date(startDate);
    console.log(date1, date1.getDay());
    let date2 = new Date(endDate);
    console.log(date2.getTime() - date1.getTime());

    let bool = date1.getTime() <= date2.getTime()
    if(!bool) throw new BadRequestException('startDate should be less than or equal endDate')
  }
}

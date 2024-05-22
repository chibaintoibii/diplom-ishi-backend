import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Group, GroupDocument} from "./schemas/group.schema";
import {FilterQuery, Model, Types} from "mongoose";
import {UsersService} from "../users/users.service";
import {FilterGroupDto} from "./dto/filter-group.dto";
import {Role} from "../auth/roles/roles.enum";
import {GroupStatus} from "./types";

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

    const group = await this.groupModel.create(dto);
    await this.usersService.addGroupToTeacher({
      teacherId: teacher._id,
      groupId: group._id
    })
    return group;
  }

  async find(dto: FilterGroupDto) {
    const filter: FilterQuery<GroupDocument> = {status: dto.status,}
    if (dto.userRole === Role.Teacher) {
      filter.teacherId = dto.userId
    }
    const groups: GroupDocument[] = await this.groupModel.find(filter, {
      _id: 1, name: 1, countOfStudents: {$size: '$students'}, createdAt: 1
    }).populate({
      path: 'teacherId', select: {
        _id: 0, fullName: 1
      }
    }).exec()
    return groups
      .map(group => {
        return {
          _id: group._id.toString(), name: group.name, teacher: group.teacherId,
          createdAt: group.createdAt,
        }
      })
  }

  async getLabels() {
    const groups = await this.groupModel.find({
      status: GroupStatus.ACTIVE
    }, {_id: 1, name: 1})
    return groups.map(group => {
      return {
        value: group._id,
        name: group.name
      }
    })
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

  async addStudentToGroup(groupId: string, studentId: string) {
    return this.groupModel.updateOne({
      _id: new Types.ObjectId(groupId)
    }, {
      $push: {
        students: new Types.ObjectId(studentId)
      }
    })
  }

}

import {BadRequestException, ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model, Types} from "mongoose";
import {CreateStudentDto} from "./dto/create-student.dto";
import {GroupsService} from "../groups/groups.service";
import {Role} from "../auth/roles/roles.enum";


@Injectable()
export class StudentsService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
              private readonly groupsService: GroupsService) {
  }

  async create(body: CreateStudentDto) {
    const group = await this.checkBody(body);
    const student = await this.userModel.create({
      ...body,
      groupId: new Types.ObjectId(body.groupId),
      gpa: 0,
      role: Role.Student
    })

    await this.groupsService.addStudentToGroup(body.groupId, student._id);

    return {
      _id: student._id,
      username: student.username
    }
  }

  async checkBody(dto: CreateStudentDto) {
    const group = await this.groupsService.findById(dto.groupId);
    if (!group)
      throw new NotFoundException('Group not found!');
    const candidate = await this.userModel.findOne({
      username: dto.username
    });
    if (candidate)
      throw new ConflictException('user is already exists');
    return group
  }

  async getGroupStudents(groupId: string) {
    const students = await this.userModel.find({
      groupId: new Types.ObjectId(groupId)
    }, {
      _id: 1, username: 1, phoneNumber: 1, fullName: 1, gpa: 1
    }).sort([['createdAt', 1]]).exec()
    return students
  }
}
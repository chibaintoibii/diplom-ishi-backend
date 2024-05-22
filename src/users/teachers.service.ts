import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import { FilterQuery, Model} from "mongoose";
import {CreateTeacherDto} from "./dto/create-teacher.dto";
import {Role} from "../auth/roles/roles.enum";
import {CreateTeacherResponseDto} from "./dto/create-teacher-response.dto";
import {FilterTeacherDto} from "../helper/types/teacher";


export class TeachersService {
  constructor(@InjectModel(User.name) private readonly user: Model<UserDocument>) {
  }

  async createTeacher(dto: CreateTeacherDto): Promise<CreateTeacherResponseDto> {
    const teacher = await this.user.create({
      ...dto,
      role: Role.Teacher,
    })

    return {
      created: true,
      id: teacher._id
    }
  }

  async getTeachers(filters: FilterTeacherDto) {
    const limit = 20;
    const combinedFilter: FilterQuery<UserDocument> = {state: 1, role: Role.Teacher};

    if (filters.search) {
      combinedFilter['$or'] = [
        {username: new RegExp(filters.search, 'i')},
        {fullName: new RegExp(filters.search, 'i')},
        {PhoneNumber: new RegExp(filters.search, 'i')},
      ]
    }

    const teachers = await this.user.find(combinedFilter, {
      _id: 1,
      fullName: 1,
      phoneNumber: 1,
      countOfGroups: {$size: '$groups'},
      username: 1,
    }).skip((filters.page - 1) * limit)
      .limit(limit).lean()
    const count = await this.user.countDocuments(combinedFilter);
    return {
      teachers,
      meta: {
        count: count,
        currentPage: Number(filters.page)
      }
    }
  }

  async updateTeacher() {

  }
}
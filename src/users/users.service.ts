import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model, Types} from "mongoose";
import {FilterUserDto} from "./dto/filter-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {Role} from "../auth/roles/roles.enum";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly user: Model<UserDocument>) {
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    const candidate = await this.findByUsername(data.username);
    if (candidate)
      throw new HttpException("this user already exists", HttpStatus.BAD_REQUEST);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.user.create({
      ...data, password: hashedPassword
    });
  }

  async findById(id: string): Promise<UserDocument> {
    return this.user.findOne({
      _id: new Types.ObjectId(id)
    })
  }

  async addGroupToTeacher(data: {
    teacherId: string, groupId: string
  }) {
    await this.user.updateOne({
      _id: new Types.ObjectId(data.teacherId)
    }, {
      $push: {
        groups: data.groupId
      }
    })

    return {
      message: 'success',
      status: 200
    }
  }

  async find(filter: FilterUserDto) {
    const combinedFilter = {
      state: 1,
    };

    Object.keys(filter).forEach(item => {
      if (!([undefined, null, ''].includes(filter[item]))) {
        combinedFilter[item] = filter[item];
      }
    })


    console.log(combinedFilter);
    const limit = 15;
    return this.user.find(combinedFilter, {
      _id: 1,
      fullName: 1,
      username: 1,
      groupId: 1
    }).limit(limit).skip((filter.page - 1) * limit)
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.user.findOne({
      username: username,
      state: 1
    })
  }

  async getUserDetails(id: string, role: Role) {
    const user = await this.user.findOne({
      _id: new Types.ObjectId(id)
    })

    return user;
  }
}
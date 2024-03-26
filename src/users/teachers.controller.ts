import {Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {Role} from "../auth/roles/roles.enum";
import {RolesGuard} from "../auth/roles/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {FilterUserDto} from "./dto/filter-user.dto";
import {CreateTeacherDto} from "./dto/create-teacher.dto";

@Controller('teachers')
export class TeachersController {
  constructor(private readonly usersService: UsersService) {
  }


  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async registerTeacher(@Body() dto: CreateTeacherDto) {
    const teacher = await this.usersService.create({
      ...dto,
      role: Role.Teacher
    })
    return {
      id: teacher._id
    };
  }

  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findTeachers(@Query() filter: FilterUserDto) {
    return this.usersService.find({
      ...filter,
      role: Role.Teacher
    })
  }
}
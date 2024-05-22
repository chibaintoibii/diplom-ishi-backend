import {Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {Role} from "../auth/roles/roles.enum";
import {RolesGuard} from "../auth/roles/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {FilterUserDto} from "./dto/filter-user.dto";
import {CreateTeacherDto} from "./dto/create-teacher.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {TeachersService} from "./teachers.service";
import {CreateTeacherResponseDto} from "./dto/create-teacher-response.dto";
import {FilterTeacherDto} from "../helper/types/teacher";

@ApiBearerAuth()
@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly usersService: UsersService,
  private readonly teachersService: TeachersService) {
  }


  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async registerTeacher(@Body() dto: CreateTeacherDto) {
    return this.teachersService.createTeacher(dto);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findTeachers(@Query() filter: FilterTeacherDto) {
    return this.teachersService.getTeachers(filter);
  }
}
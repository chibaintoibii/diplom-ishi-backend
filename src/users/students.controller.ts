import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles/roles.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {Role} from "../auth/roles/roles.enum";
import {UsersService} from "./users.service";
import {FilterUserDto} from "./dto/filter-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {GroupsService} from "../groups/groups.service";
import {RegisterStudentDto} from "./dto/register-student.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {StudentsService} from "./students.service";

@ApiBearerAuth()
@ApiTags('Students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService, private readonly groupsService: GroupsService) {
  }

  @Post('/')
  async registerStudent(@Body() body: RegisterStudentDto) {
    return this.studentsService.create(body);
  }

  @Get('/')
  getStudents(@Query('groupId') groupId: string) {
    return this.studentsService.getGroupStudents(groupId);
  }

  @Get(':id/gpa')
  getStudentGPA(@Param('id') id: string) {

  }


}
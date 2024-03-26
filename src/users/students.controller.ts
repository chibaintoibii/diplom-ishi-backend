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


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('students')
export class StudentsController {
  constructor(private readonly usersService: UsersService, private readonly groupsService: GroupsService) {
  }

  @Post('/')
  async registerStudent(@Body() dto: RegisterStudentDto) {
    const group = await this.groupsService.findById(dto.groupId);

    const student = await this.usersService.create(dto);
    await this.groupsService.addStudent({
      groupId: group._id,
      studentId: student._id
    })
    return {
      student: {
        id: student._id.toHexString(),
        groupId: student.groupId.toHexString()
      }
    }
  }


  @Get('/')
  getStudents(@Query() filter: FilterUserDto) {
    return this.usersService.find({
      ...filter,
      role: Role.Student
    })
  }

  @Get(':id/gpa')
  getStudentGPA(@Param('id') id: string) {

  }


}
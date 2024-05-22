import {Body, Controller, ForbiddenException, Get, Param, ParseEnumPipe, Post, Query, UseGuards} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {User, UserJwtPayload} from "../auth/auth.decorator";
import {Role} from "../auth/roles/roles.enum";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles/roles.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {FilterGroupDto} from "./dto/filter-group.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {GroupStatus} from "./types";


@ApiBearerAuth()
@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }


  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Teacher, Role.Admin)
  // @Get(':id')
  // async findById(
  //   @Param('id') id: string,
  //   @User() user: UserJwtPayload
  // ) {
  //   const group = await this.groupsService.findById(id);
  //   if (group.teacher._id.toString() !== user.id || user.role !== Role.Admin || user?.groupId !== group._id) {
  //     throw new ForbiddenException();
  //   }
  //   return group;
  // }

  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  getTeacherGroups(@User() user: UserJwtPayload, @Query('status', new ParseEnumPipe(GroupStatus)) status: GroupStatus) {
    return this.groupsService.find({
      userId: user.id,
      userRole: user.role,
      status
    })
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/labels')
  async getGroupsLabels() {
    return this.groupsService.getLabels();
  }
}

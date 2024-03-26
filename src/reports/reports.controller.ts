import {Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query} from '@nestjs/common';
import {ReportsService} from './reports.service';
import {CreateReportDto} from './dto/create-report.dto';
import {UpdateReportDto} from './dto/update-report.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles/roles.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {Role} from "../auth/roles/roles.enum";
import {User, UserJwtPayload} from "../auth/auth.decorator";

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Student)
  createReport(@Body() dto: CreateReportDto, @User() user: UserJwtPayload) {

  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findReports(@User() user: UserJwtPayload, @Query('groupId') groupId: string) {
    return this.reportsService.find({
      userId: user.id,
      role: user.role,
      groupId
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserJwtPayload) {

  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
    @User() user: UserJwtPayload
  ) {

  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Student, Role.Admin)
  @Delete(':id')
  removeReport(@Param('id') id: string, @User() user: UserJwtPayload) {

  }
}

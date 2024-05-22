import {Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query} from '@nestjs/common';
import {ReportsService} from './reports.service';
import {UpdateReportDto} from './dto/update-report.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles/roles.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {Role} from "../auth/roles/roles.enum";
import {User, UserJwtPayload} from "../auth/auth.decorator";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateReportResponseDto} from "./dto/create-report-response.dto";
import {CreateReportsForGroupDto} from "./dto/create-reports-for-group.dto";

@Controller('reports')
@ApiBearerAuth()
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {
  }

  @Post()
  @ApiOperation({summary: 'Create daily oreports for group'})
  @ApiResponse({status: 201, type: CreateReportResponseDto})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  createDailyReportsForGroup(@Body() dto: CreateReportsForGroupDto, @User() user: UserJwtPayload) {
    return this.reportsService.createDailyReportsForGroup(dto, user);
  }

  @Get('')
  async getGroupReports(@Query('groupId') groupId: string) {
    return this.reportsService.findGroupReports(groupId);
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

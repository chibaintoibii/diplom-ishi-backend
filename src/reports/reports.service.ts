import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateReportDto} from './dto/create-report.dto';
import {UpdateReportDto} from './dto/update-report.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Report, ReportDocument} from "./schemas/report.schema";
import {Model, Types} from "mongoose";
import {Role} from "../auth/roles/roles.enum";
import {GroupsService} from "../groups/groups.service";

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
    private readonly groupsService: GroupsService) {
  }

  async create(dto: CreateReportDto): Promise<string> {
    const report = await this.reportModel.create({
      ...dto
    });
    return report._id;
  }

  async find(filter: {
    userId: string,
    role: Role,
    groupId: string
  }) {
    const group = await this.groupsService.findById(filter.groupId);
    if (!group)
      throw new NotFoundException('Group not found');

    const studentIds = group.students;
    if (
      (filter.role === Role.Student && !studentIds.find(id => id === new Types.ObjectId(filter.userId)))
      || (filter.role === Role.Teacher && group.teacherId !== new Types.ObjectId(filter.userId))
    )
      throw new ForbiddenException();

    const reports = await this.reportModel.find({
      author: {$in: group.students},
      state: 1
    }, {
      _id: 1,
      author: 1,
      title: 1,
      content: 1
    }).populate({path: 'author', select: '_id fullName', match: {state: 1}})

    return reports;
  }

  async findStudentReports(studentId: string) {
    return this.reportModel.find({
      author: new Types.ObjectId(studentId)
    })
  }

  async findGroupReports(groupId: string) {
    const group = await this.groupsService.findById(groupId);
    const studentIds = group.students;
    return this.reportModel.find({
      author: {$in: studentIds}
    });

  }

  findOne(id: string) {

  }

  update(id: string, updateReportDto: UpdateReportDto) {

  }


  remove(id: string) {

  }
}

import {Injectable} from '@nestjs/common';
import {CreateReportDto} from './dto/create-report.dto';
import {UpdateReportDto} from './dto/update-report.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Report, ReportDocument} from "./schemas/report.schema";
import {Model, Types} from "mongoose";
import {GroupsService} from "../groups/groups.service";
import {ReportStatus} from "../common/enums/report-status.enum";
import {CreateReportsForGroupDto} from "./dto/create-reports-for-group.dto";
import {UserJwtPayload} from "../auth/auth.decorator";

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
    private readonly groupsService: GroupsService) {
  }

  async create(dto: CreateReportDto): Promise<{ success: true, _id: string }> {
    const report = await this.reportModel.create({
      ...dto,
      status: ReportStatus.New
    });
    return {success: true, _id: report._id.toString()};
  }

  async createDailyReportsForGroup(dto: CreateReportsForGroupDto, user: UserJwtPayload) {
    const group = await this.groupsService.findById(dto.groupId);
    const reportIds: string[] = [];
    for (const student of group.students) {
      const report = await this.reportModel.create({
        author: student,
        title: dto.title,
        deadline: dto.deadline,
        status: ReportStatus.New,
        createdBy: new Types.ObjectId(user.id)
      })
      reportIds.push(report._id);
    }
    return {reportIds}
  }


  // async findStudentReports(studentId: string) {
  //   return this.reportModel.find({
  //     author: new Types.ObjectId(studentId)
  //   })
  // }

  async findGroupReports(groupId: string) {
    const group = await this.groupsService.findById(groupId);
    const studentIds = group.students;
    const reports = await this.reportModel.find({
      author: {$in: studentIds}
    }).populate('author');

    const backlogReports = reports
      .filter(report => report.status === ReportStatus.Backlog)
      .map(item => {
        return {_id: item._id, author: item.author.fullName, title: item.title, deadline: item.deadline}
      })

    const newReports = reports
      .filter(report => report.status === ReportStatus.New)
      .map(item => {
        return {_id: item._id, author: item.author.fullName, title: item.title, deadline: item.deadline}
      })

    const doneReports = reports
      .filter(report => report.status === ReportStatus.Done)
      .map(item => {
        return {_id: item._id, author: item.author.fullName, title: item.title, deadline: item.deadline}
      })

    const estimatedReports = reports
      .filter(report => report.status === ReportStatus.Estimated)
      .map(item => {
        return {
          _id: item._id,
          author: item.author.fullName,
          title: item.title,
          deadline: item.deadline,
          assessment: item.assessment
        }
      })

    const rejectedReports = reports
      .filter(report => report.status === ReportStatus.Rejected)
      .map(item => {
        return {
          _id: item._id,
          author: item.author.fullName,
          title: item.title,
          deadline: item.deadline,
          reasonReject: item.reasonReject
        }
      })

    return {backlogReports, newReports, doneReports, estimatedReports, rejectedReports}

  }

  findOne(id: string) {

  }

  update(id: string, updateReportDto: UpdateReportDto) {

  }


  remove(id: string) {

  }
}

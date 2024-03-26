import {Module} from '@nestjs/common';
import {ReportsService} from './reports.service';
import {ReportsController} from './reports.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Report, ReportSchema} from "./schemas/report.schema";
import {GroupsModule} from "../groups/groups.module";

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [MongooseModule.forFeature([{name: Report.name, schema: ReportSchema}]),
    GroupsModule
  ]
})
export class ReportsModule {
}

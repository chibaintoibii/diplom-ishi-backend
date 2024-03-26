import {Module} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {User, UserSchema} from "./users/schemas/user.schema";
import {AuthService} from "./auth/auth.service";
import {GroupsModule} from './groups/groups.module';
import {ReportsModule} from './reports/reports.module';
import {Report, ReportSchema} from "./reports/schemas/report.schema";
import {Group, GroupSchema} from "./groups/schemas/group.schema";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Report.name, schema: ReportSchema},
      {name: Group.name, schema: GroupSchema},
    ]),
    AuthModule,
    GroupsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [AuthService, JwtService],
})
export class AppModule {
}

import {Module} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {User, UserSchema} from "./users/schemas/user.schema";
import {AuthService} from "./auth/auth.service";
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ]),
    AuthModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [AuthService, JwtService],
})
export class AppModule {
}

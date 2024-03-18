import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User, UserSchema} from "./schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {StudentsController} from "./students.controller";
import {TeachersController} from "./teachers.controller";
import {GroupsModule} from "../groups/groups.module";

@Module({
  controllers: [UsersController, StudentsController, TeachersController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    forwardRef(() => AuthModule),
    forwardRef(() => GroupsModule)
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}

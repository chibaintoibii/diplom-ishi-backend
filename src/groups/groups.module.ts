import {forwardRef, Module} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {GroupsController} from './groups.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Group, GroupSchema} from "./schemas/group.schema";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [MongooseModule.forFeature([{name: Group.name, schema: GroupSchema}]),
    forwardRef(() => UsersModule)
  ],
  exports: [GroupsService]
})
export class GroupsModule {
}

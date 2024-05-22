import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types, Document} from "mongoose";
import {User} from "src/users/schemas/user.schema";
import {GroupStatus} from "../types";
import {Type} from "class-transformer";

export type GroupDocument = Group & Document & { createdAt: Date, updatedAt: Date };

@Schema({
  timestamps: true,
  versionKey: false
})
export class Group {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  teacherId: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    ref: 'User'
  })
  students: Types.ObjectId[]

  @Prop({type: String, enum: GroupStatus, default: GroupStatus.ACTIVE})
  status: GroupStatus
}


export const GroupSchema = SchemaFactory.createForClass(Group);

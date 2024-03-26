import {Document, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Role} from "../../auth/roles/roles.enum";


export type UserDocument = User & Document

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true
  })
  fullName: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: Types.ObjectId
  })
  groupId: Types.ObjectId;

  @Prop({
    type: [{type: Types.ObjectId, ref: 'Group'}]
  })
  groups: Types.ObjectId[]

  @Prop({
    type: String,
    required: true
  })
  phoneNumber: string;

  @Prop({
    type: String,
    enum: Role,
    required: true
  })
  role: Role;

  @Prop({
    type: Number,
  })
  gpa: number

  @Prop({
    default: 1,
    type: Number
  })
  state: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types, Document} from "mongoose";
import {User} from "src/users/schemas/user.schema";

export type GroupDocument = Group & Document;

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
    ref: User.name,
    required: true
  })
  teacherId: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    ref: User.name
  })
  students: Types.ObjectId[]

  @Prop({
    type: Date,
    required: true
  })
  startDate: Date;

  @Prop({
    type: Date,
    required: true
  })
  endDate: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

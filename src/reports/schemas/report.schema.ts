import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../users/schemas/user.schema";
import {Types, Document} from "mongoose";
import {ReportStatus} from "../../common/enums/report-status.enum";

export type ReportDocument = Report & Document;

@Schema({
  timestamps: true,
  versionKey: false
})
export class Report {
  @Prop({
    type: String,
    required: true,
    maxlength: 255,
    minlength: 3,
  })
  title: string;

  @Prop({
    type: String,
    maxlength: 5000,
    minlength: 3,
    required: true,
  })
  content: string;

  @Prop({
    type: Types.ObjectId, ref: 'User',
    required: true
  })
  author: User;

  @Prop({
    type: String,
    enum: ReportStatus,
    default: ReportStatus.New
  })
  status: ReportStatus;

  @Prop({
    type: Number,
    max: 10,
    min: 0
  })
  assessment: number

  @Prop({
    type: Number,
    default: 1
  })
  state: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

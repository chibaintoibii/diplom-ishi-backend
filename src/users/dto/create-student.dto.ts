import {IsMongoId, IsString, Length} from "class-validator";
import {Transform, Type} from "class-transformer";
import {Types} from "mongoose";

export class CreateStudentDto {
  @IsString()
  @Length(6, 100)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsString()
  @Length(6, 100)
  fullName: string;

  @IsString()
  @Length(13, 13)
  phoneNumber: string;

  @IsMongoId()
  groupId: string;
}

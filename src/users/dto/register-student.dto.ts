import {IsEnum, IsMongoId, IsOptional, IsString, Length} from "class-validator";
import {Role} from "../../auth/roles/roles.enum";

export class RegisterStudentDto {
  @IsString()
  @Length(6, 30)
  username: string;

  @IsString()
  @Length(6, 50)
  password: string;

  @IsString()
  @Length(6, 100)
  fullName: string;

  @IsString()
  @Length(7, 20) //+998914431921
  phoneNumber: string;

  @IsString()
  groupId: string;
}
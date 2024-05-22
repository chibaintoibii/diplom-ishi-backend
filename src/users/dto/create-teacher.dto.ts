import {IsEnum, IsOptional, IsString, Length} from "class-validator";
import {Role} from "../../auth/roles/roles.enum";

export class CreateTeacherDto {
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
  @Length(13, 13) //+998914431921
  phoneNumber: string;
}
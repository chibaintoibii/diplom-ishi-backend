import {Role} from "../../auth/roles/roles.enum";
import {IsEnum, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {
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

  @IsEnum(Role)
  role?: Role

  @IsString()
  @IsOptional()
  groupId?: string;
}
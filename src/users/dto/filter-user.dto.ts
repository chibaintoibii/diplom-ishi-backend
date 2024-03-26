import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {Role} from "../../auth/roles/roles.enum";

export class FilterUserDto {
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  @IsOptional()
  search: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page: number = 1;
}
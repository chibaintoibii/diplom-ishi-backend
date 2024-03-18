import {IsDate, IsMongoId, IsString, Length} from "class-validator";

export class CreateGroupDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsMongoId()
  teacherId: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date
}

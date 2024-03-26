import {IsMongoId, IsNotEmpty, IsString, Length} from "class-validator";
import {IsValidDate} from "../../common/validators/is-valid-date.valitor";

export class CreateGroupDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsMongoId()
  teacherId: string;

  @IsValidDate()
  @IsNotEmpty()
  startDate: string;

  @IsValidDate()
  @IsNotEmpty()
  endDate: string;
}

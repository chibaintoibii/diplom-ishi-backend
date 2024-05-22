import {IsValidDate} from "../../common/validators/is-valid-date.valitor";
import {IsMongoId, IsString} from "class-validator";

export class CreateReportsForGroupDto {

  @IsMongoId()
  groupId: string

  @IsString()
  title: string

  @IsValidDate()
  deadline: string
}
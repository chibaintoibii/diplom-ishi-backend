import {IsMongoId, IsString, Length} from "class-validator";

export class CreateReportDto {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @Length(3, 5000)
  content: string;

  @IsMongoId()
  author: string;
}

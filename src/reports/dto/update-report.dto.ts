import {IsEnum, IsMongoId, IsNumber, IsString, Length, Max, Min} from "class-validator";
import {ReportStatus} from "../../common/enums/report-status.enum";

export class UpdateReportDto {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @Length(3, 5000)
  content: string;

  @IsMongoId()
  author: string;

  @IsEnum(ReportStatus)
  status: ReportStatus

  @IsNumber()
  @Max(10)
  @Min(0)
  assessment: number;
}

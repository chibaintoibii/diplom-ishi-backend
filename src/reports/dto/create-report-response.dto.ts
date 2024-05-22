import {ApiProperty} from "@nestjs/swagger";
import {CreateReportDto} from "./create-report.dto";

export class CreateReportResponseDto extends CreateReportDto{
  @ApiProperty({example: '507f1f77bcf86cd799439011', description: 'The _id of the report'})
  _id: string;
}
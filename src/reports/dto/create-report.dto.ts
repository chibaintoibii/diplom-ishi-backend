import {IsMongoId, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateReportDto {

  @ApiProperty({ example: 'some title', description: 'The title of the report' })
  @IsString()
  @Length(3, 255)
  title: string;

  @ApiProperty({ example: 'some content', description: 'The title of the report' })
  @IsString()
  @IsOptional()
  @Length(0, 5000)
  content: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'The author id of the report' })
  @IsMongoId()
  author: string;
}


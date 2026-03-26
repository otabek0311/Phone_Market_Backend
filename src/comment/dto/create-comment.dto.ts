import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Very good product!' })
  @IsString()
  @MinLength(2)
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  question: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  expiresAt: string;
  
}

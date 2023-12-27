import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'consider using letters and numbers for better security',
  })
  password: string;
}

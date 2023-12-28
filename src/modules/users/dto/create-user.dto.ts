import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  email: string;

  @IsNotEmpty()
  @IsIn(['admin', 'guest'])
  profile: 'admin' | 'guest';

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  document: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'consider using letters and numbers for better security',
  })
  password: string;
}

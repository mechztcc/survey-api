import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { VoteAnswer } from 'src/modules/users/entities/user-vote.entity';

export class VoteSurveyDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  answer: VoteAnswer;
}

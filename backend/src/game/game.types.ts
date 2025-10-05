import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export enum Choice {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
  LIZARD = 'lizard',
  SPOCK = 'spock',
}

export type ChoiceResponse = {
  id: number;
  name: string;
};

export type RandomNumberResponse = {
  random_number: number;
};

export class PlayRequest {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  player: number;
}

export type PlayResult = 'win' | 'lose' | 'tie';

export type PlayResponse = {
  result: PlayResult;
  player: number;
  computer: number;
};

import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import {
  Choice,
  ChoiceResponse,
  PlayRequest,
  PlayResponse,
} from './game.types';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('choices')
  getChoices(): Choice[] {
    return this.gameService.getAllChoices();
  }

  @Get('choice')
  async getRandomChoice(): Promise<ChoiceResponse> {
    return this.gameService.getRandomChoice();
  }

  @Post('play')
  async play(@Body() request: PlayRequest): Promise<PlayResponse> {
    return this.gameService.play(request);
  }
}

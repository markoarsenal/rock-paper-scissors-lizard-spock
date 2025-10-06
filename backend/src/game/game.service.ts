import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';

import {
  Choice,
  ChoiceResponse,
  PlayRequest,
  PlayResponse,
  PlayResult,
  RandomNumberResponse,
} from './game.types';

@Injectable()
export class GameService {
  constructor(private readonly httpService: HttpService) {}

  private determineWinner(
    playerChoice: number,
    computerChoice: number,
  ): PlayResult {
    if (playerChoice === computerChoice) return 'tie';

    const winConditions: { [key: number]: number[] } = {
      1: [3, 4], // Rock beats Scissors(3), Lizard(4)
      2: [1, 5], // Paper beats Rock(1), Spock(5)
      3: [2, 4], // Scissors beats Paper(2), Lizard(4)
      4: [2, 5], // Lizard beats Paper(2), Spock(5)
      5: [1, 3], // Spock beats Rock(1), Scissors(3)
    };

    return winConditions[playerChoice]?.includes(computerChoice)
      ? 'win'
      : 'lose';
  }

  getAllChoices(): Choice[] {
    return Object.values(Choice);
  }

  async getRandomChoice(): Promise<ChoiceResponse> {
    const RANDOM_NUMBER_API_URL = 'https://codechallenge.boohma.com/random';
    const choices = Object.values(Choice);

    try {
      // Try to get random number from external API with 1s timeout
      const response = await firstValueFrom(
        this.httpService
          .get<RandomNumberResponse>(RANDOM_NUMBER_API_URL)
          .pipe(timeout(1000)),
      );

      const randomNumber = response.data.random_number;
      const choiceIndex = Math.floor((randomNumber / 100) * choices.length);
      const selectedChoice = choices[choiceIndex];

      return {
        id: choiceIndex + 1,
        name: selectedChoice,
      };
    } catch {
      // Fallback to custom random number generation
      const randomIndex = Math.floor(Math.random() * choices.length);

      const selectedChoice = choices[randomIndex];

      return {
        id: randomIndex + 1,
        name: selectedChoice,
      };
    }
  }

  async play(request: PlayRequest): Promise<PlayResponse> {
    const { player: playerChoice } = request;

    const computerChoiceResponse = await this.getRandomChoice();
    const computerChoice = computerChoiceResponse.id;

    const result = this.determineWinner(playerChoice, computerChoice);

    return {
      result,
      player: playerChoice,
      computer: computerChoice,
    };
  }
}

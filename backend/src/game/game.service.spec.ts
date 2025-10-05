import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GameService } from './game.service';
import { Choice } from './game.types';

jest.mock('rxjs');

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnThis(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all choices', () => {
    const choices = service.getAllChoices();
    expect(choices).toEqual(Object.values(Choice));
  });

  it.each([1, 2, 3, 4, 5])(
    'should return a random choice - %s',
    async (randomNumber) => {
      (firstValueFrom as jest.Mock).mockResolvedValue({
        data: { random_number: randomNumber * 20 - 1 },
      });

      const choice = await service.getRandomChoice();

      expect(choice).toBeDefined();
      expect(choice.id).toBe(randomNumber);
      expect(choice.name).toBe(Object.values(Choice)[randomNumber - 1]);
    },
  );

  it('should return a random choice when codechallenge api returns an error', async () => {
    (firstValueFrom as jest.Mock).mockRejectedValue(new Error('Error'));
    jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const choice = await service.getRandomChoice();

    expect(choice).toBeDefined();
    expect(choice.id).toBe(1);
    expect(choice.name).toBe('rock');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Choice } from './game.types';

describe('GameController', () => {
  let controller: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: {
            getAllChoices: jest.fn(),
            getRandomChoice: jest.fn(),
            play: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all choices', () => {
    const mockChoices = Object.values(Choice);
    const getAllChoicesMock = gameService.getAllChoices as jest.Mock;

    getAllChoicesMock.mockReturnValue(mockChoices);

    const choices = controller.getChoices();

    expect(choices).toEqual(mockChoices);
    expect(getAllChoicesMock).toHaveBeenCalled();
  });

  it('should return a random choice', async () => {
    const mockChoice = { id: 1, name: 'rock' };
    const getRandomChoiceMock = gameService.getRandomChoice as jest.Mock;

    getRandomChoiceMock.mockResolvedValue(mockChoice);

    const choice = await controller.getRandomChoice();

    expect(choice).toEqual(mockChoice);
    expect(getRandomChoiceMock).toHaveBeenCalled();
  });

  it('should return a play response', async () => {
    const mockResponse = { results: 'win', player: 1, computer: 2 };
    const playMock = gameService.play as jest.Mock;

    playMock.mockResolvedValue(mockResponse);

    const response = await controller.play({ player: 1 });

    expect(response).toEqual(mockResponse);
    expect(playMock).toHaveBeenCalled();
  });
});

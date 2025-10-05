import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [HttpModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}

import { DefaultValuePipe } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { GameType } from 'src/constant/game.constant';

export class SimulateGameDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsMongoId()
  kahoot: string;

  @IsNotEmpty()
  @IsEnum(GameType)
  type: GameType;

  @ValidateIf((o) => o.type == GameType.CHALLENGE)
  @IsNotEmpty()
  @IsISO8601()
  startTime: Date;

  @ValidateIf((o) => o.type == GameType.CHALLENGE)
  @IsNotEmpty()
  @IsISO8601()
  endTime: Date;

  @IsOptional()
  @IsBoolean()
  randomize_answers: boolean;

  @IsOptional()
  @IsBoolean()
  randomize_question: boolean;
}

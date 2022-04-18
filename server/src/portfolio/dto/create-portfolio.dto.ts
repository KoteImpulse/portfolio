import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly brand: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly tagline: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly maincategory: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsArray({ message: 'Должно быть массивом' })
  @ArrayNotEmpty({ message: 'Должно быть не пустым массивом' })
  readonly category: string[];

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly link: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly task: string;

  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly result: string;

  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly devYear?: number;
}

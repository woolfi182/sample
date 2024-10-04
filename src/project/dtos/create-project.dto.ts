import { IsString, MinLength } from 'class-validator';

export class CreateProjectRequestDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  leadRequirements: string;

  @IsString({ each: true })
  groups: string[];
}

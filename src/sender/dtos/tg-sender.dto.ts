import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TgCreateSenderDto {
  @IsString()
  senderId: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  langCode: string;

  @IsBoolean()
  isBot: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsBoolean()
  isPremium: boolean;

  @IsBoolean()
  isBotBusiness: boolean;

  @IsBoolean()
  isRestricted: boolean;

  @IsBoolean()
  isScam: boolean;
}

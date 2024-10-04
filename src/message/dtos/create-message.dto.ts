import { IsEnum, IsObject, IsString } from 'class-validator';
import { TgCreateSenderDto } from 'src/sender/dtos/tg-sender.dto';
import { EUserSocialType } from 'src/user/user.enum';

export interface CreateMessageMetadata {}

export class TgCreateMessageMetadata implements CreateMessageMetadata {
  @IsString()
  tgId: string;

  @IsString()
  groupId: string;

  @IsString()
  messageId: string;

  @IsObject()
  sender: TgCreateSenderDto;
}

export class CreateMessageDto {
  @IsEnum(EUserSocialType)
  type: EUserSocialType;

  @IsString()
  message: string;

  // TODO: add validation for other metadata like whatsapp, facebook, etc
  @IsObject({ each: true })
  metadata: TgCreateMessageMetadata;
}

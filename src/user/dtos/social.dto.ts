import { EUserSocialType } from '../user.enum';

export class SocialPatchDto {
  type: EUserSocialType;
  data: SocialTelegramDto | SocialWhatsUpDto;
}

export class SocialTelegramDto {
  username: string;
}

export class SocialWhatsUpDto {
  phone: string;
}

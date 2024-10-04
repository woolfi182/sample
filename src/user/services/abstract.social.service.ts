import { BaseException } from 'src/common/exception';
import { User } from '../entities/user.entity';

export class SocialNotFoundException extends BaseException {
  status = 400;
  constructor(payload: any) {
    super('Social not found', payload);
  }
}

export abstract class ASocialService {
  abstract setSocial(user: User, socialData: any): Promise<any>;
}

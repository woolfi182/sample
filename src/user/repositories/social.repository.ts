import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSocial } from '../entities/user-social.entity';

@Injectable()
export class SocialRepository {
  constructor(
    @InjectRepository(UserSocial)
    private readonly socialRepo: Repository<UserSocial>,
  ) {}

  async create(data: UserSocial): Promise<UserSocial | null> {
    return this.socialRepo.save(data);
  }
}

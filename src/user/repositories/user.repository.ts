import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getUserByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    const [err, user] = await this.usersRepo
      .findOne({
        where: [{ username }, { email }],
      })
      .tuple();
    if (err) {
      console.error(err);
      return null;
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: [{ username }],
    });
  }

  async create(user: User): Promise<User | null> {
    return this.usersRepo.save(user);
  }
}

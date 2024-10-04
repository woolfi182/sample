import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async save(project: Project): Promise<Project> {
    return this.projectRepo.save(project);
  }

  async findById(user: User, id: number): Promise<Project> {
    return this.projectRepo.findOne({ where: { user, id } });
  }

  async findAll(user: User): Promise<Project[]> {
    return this.projectRepo.find({ where: { user } });
  }
}

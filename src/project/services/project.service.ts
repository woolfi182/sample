import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateProjectRequestDto } from '../dtos/create-project.dto';
import { EProjectStatus } from '../project.enum';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async createProject(user: User, projectData: CreateProjectRequestDto): Promise<Project> {
    const project = new Project();
    project.name = projectData.name;
    project.leadRequirements = projectData.leadRequirements;
    project.groups = projectData.groups;
    project.user = user;

    return this.projectRepo.save(project);
  }

  async findAllProjects(user: User): Promise<Project[]> {
    return this.projectRepo.findAll(user);
  }

  async findProjectById(user: User, projectId: number): Promise<Project> {
    return this.projectRepo.findById(user, projectId);
  }

  async updateProject(user: User, projectId: number, projectData: CreateProjectRequestDto): Promise<Project> {
    const project = await this.projectRepo.findById(user, projectId);
    project.name = projectData.name;
    project.leadRequirements = projectData.leadRequirements;
    project.groups = projectData.groups;

    return this.projectRepo.save(project);
  }

  async changeProjectStatus(user: User, projectId: number, status: EProjectStatus): Promise<Project> {
    const project = await this.projectRepo.findById(user, projectId);
    project.status = status;

    return this.projectRepo.save(project);
  }
}

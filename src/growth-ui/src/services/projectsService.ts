import { type GrowthApiClient } from '@/growth-api-client/client'
import type { GrowthApiProject } from '@/growth-api-client/schema'
import type { Project } from '@/models/project'

export class ProjectsService {
  private readonly client: GrowthApiClient

  constructor(client: GrowthApiClient) {
    this.client = client
  }

  async getProjects(): Promise<Project[]> {
    const getProjectsResponse = await this.client.getProjects()

    return (getProjectsResponse._embedded?.projects ?? []).map(this.mapToProject)
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const getProjectByIdResponse = await this.client.getProjectById(id)

    if (!getProjectByIdResponse) {
      return undefined
    }

    return this.mapToProject(getProjectByIdResponse)
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'dueDate'>): Promise<Project> {
    const createdProjectResponse = await this.client.createProject({
      name: project.name,
      status: project.status,
      sourceLanguage: project.sourceLanguage,
      targetLanguages: project.targetLanguages,
    })

    return this.mapToProject(createdProjectResponse)
  }

  async editProject(project: Project): Promise<Project> {
    const updatedProjectResponse = await this.client.updateProject(project.id, {
      name: project.name,
      sourceLanguage: project.sourceLanguage,
      targetLanguages: project.targetLanguages
    })

    return this.mapToProject(updatedProjectResponse)
  }

  private mapToProject(growthApiProject: GrowthApiProject): Project {
    return {
      id: growthApiProject.id,
      name: growthApiProject.name,
      status: growthApiProject.status,
      dueDate: new Date(growthApiProject.dateDue),
      sourceLanguage: growthApiProject.sourceLanguage,
      targetLanguages: growthApiProject.targetLanguages,
      createdAt: new Date(growthApiProject.dateCreated),
      updatedAt: new Date(growthApiProject.dateUpdated)
    }
  }
}

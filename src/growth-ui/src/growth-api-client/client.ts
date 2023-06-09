import type { ProjectStatus } from '@/models/status'
import {
  type GrowthApiGetProjectsResponse,
  GrowthApiGetProjectsResponseSchema,
  type GrowthApiCreateProjectsResponse,
  type GrowthApiUpdateProjectsResponse,
  GrowthApiGetProjectByIdResponseSchema,
  type GrowthApiGetProjectByIdResponse,
  GrowthApiCreateProjectsResponseSchema,
  GrowthApiUpdateProjectsResponseSchema
} from './schema'

export type CreateProjectPayload = {
  name: string
  sourceLanguage: string
  targetLanguages: string[]
  status: ProjectStatus
}

export type UpdateProjectPayload = {
  name: string
  sourceLanguage: string
  targetLanguages: string[]
}

export interface GrowthApiClient {
  getProjects(): Promise<GrowthApiGetProjectsResponse>
  getProjectById(id: number): Promise<GrowthApiGetProjectByIdResponse>
  createProject(payload: CreateProjectPayload): Promise<GrowthApiCreateProjectsResponse>
  updateProject(id: number, payload: UpdateProjectPayload): Promise<GrowthApiUpdateProjectsResponse>
}

export class DefaultGrowthApiClient implements GrowthApiClient {
  constructor(private readonly baseUrl: string) {}

  async getProjects(): Promise<GrowthApiGetProjectsResponse> {
    const baseResponse = await fetch(`${this.baseUrl}/projects`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await baseResponse.json()
    const response = await GrowthApiGetProjectsResponseSchema.parseAsync(data)
    return response
  }

  async getProjectById(id: number): Promise<GrowthApiGetProjectByIdResponse> {
    const baseResponse = await fetch(`${this.baseUrl}/projects/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await baseResponse.json()
    const response = await GrowthApiGetProjectByIdResponseSchema.parseAsync(data)
    return response
  }

  async createProject(payload: CreateProjectPayload): Promise<GrowthApiCreateProjectsResponse> {
    const baseResponse = await fetch(`${this.baseUrl}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...payload,
        dateDue: new Date(),
        dateCreated: new Date(),
        dateUpdated: new Date()
      })
    })
    const data = await baseResponse.json()
    const response = await GrowthApiCreateProjectsResponseSchema.parseAsync(data)
    return response
  }

  async updateProject(
    id: number,
    payload: UpdateProjectPayload
  ): Promise<GrowthApiUpdateProjectsResponse> {
    const baseResponse = await fetch(`${this.baseUrl}/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await baseResponse.json()
    const response = await GrowthApiUpdateProjectsResponseSchema.parseAsync(data)
    return response
  }
}

import { GrowthApiClient } from "@/growth-api-client/client"
import type { Project } from "@/models/project"

export class ProjectsService {
    private readonly client: GrowthApiClient
    
    constructor(baseUrl: string) {
        this.client = new GrowthApiClient(baseUrl)
    }

    async getProjects(): Promise<Project[]> {
        const getProjectsResponse = await this.client.getProjects()

        return (getProjectsResponse._embedded?.projects ?? [])
            .map((growthApiProject) => ({
                id: growthApiProject.id,
                name: growthApiProject.name
            }))
    }
}
import { type GrowthApiGetProjectsResponse, GrowthApiGetProjectsResponseSchema } from './schema'

export class GrowthApiClient {
    constructor(private readonly baseUrl: string) {}

    async getProjects(): Promise<GrowthApiGetProjectsResponse> {
        const baseResponse = await fetch(`${this.baseUrl}/projects`)
        const data = await baseResponse.json()
        const response = await GrowthApiGetProjectsResponseSchema.parseAsync(data);
        return response;
    }
}
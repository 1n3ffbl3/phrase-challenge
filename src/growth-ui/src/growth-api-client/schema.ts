import { z } from 'zod'

const GrowthApiSelfLinkSchema = z.object({
  href: z.string()
})

const GrowthApiLinksSchema = z.object({
  self: GrowthApiSelfLinkSchema,
  project: GrowthApiSelfLinkSchema
})

export const GrowthApiProjectSchema = z
  .strictObject({
    id: z.number(),
    name: z.string(),
    sourceLanguage: z.string(),
    status: z.enum(['NEW', 'DELIVERED', 'COMPLETED']),
    targetLanguages: z.array(z.string()),
    dateCreated: z.string(),
    dateUpdated: z.string(),
    dateDue: z.string(),
    _links: GrowthApiLinksSchema
  })
  .required()

export type GrowthApiProject = z.infer<typeof GrowthApiProjectSchema>

export const GrowthApiGetProjectsResponseSchema = z
  .object({
    _embedded: z.object({
      projects: z.array(GrowthApiProjectSchema)
    })
  })
  .required()

export type GrowthApiGetProjectsResponse = z.infer<typeof GrowthApiGetProjectsResponseSchema>

export const GrowthApiCreateProjectsResponseSchema = GrowthApiProjectSchema.required()

export type GrowthApiCreateProjectsResponse = z.infer<typeof GrowthApiProjectSchema>

export const GrowthApiUpdateProjectsResponseSchema = GrowthApiProjectSchema.required()

export type GrowthApiUpdateProjectsResponse = z.infer<typeof GrowthApiProjectSchema>

export const GrowthApiGetProjectByIdResponseSchema = GrowthApiProjectSchema

export type GrowthApiGetProjectByIdResponse = z.infer<typeof GrowthApiProjectSchema>

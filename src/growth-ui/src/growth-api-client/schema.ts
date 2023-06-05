import { z } from "zod"

const GrowthApiSelfLinkSchema = z.object({
  href: z.string(),
});

const GrowthApiLinksSchema = z.object({
  self: GrowthApiSelfLinkSchema,
  project: GrowthApiSelfLinkSchema,
});

export const GrowthApiProject = z.strictObject({
  id: z.number(),
  name: z.string(),
  sourceLanguage: z.string(),
  status: z.enum(["NEW", "DELIVERED", "COMPLETED"]),
  targetLanguages: z.array(z.string()),
  dateCreated: z.string(),
  dateUpdated: z.string(),
  dateDue: z.string(),
  _links: GrowthApiLinksSchema,
}).required()

export const GrowthApiGetProjectsResponseSchema = z.object({
  _embedded: z.object({
    projects: z.array(GrowthApiProject)
  })
}).required()

export type GrowthApiGetProjectsResponse = z.infer<typeof GrowthApiGetProjectsResponseSchema>
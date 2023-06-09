import { describe, vi, expect, it } from 'vitest'
import { ProjectsService } from './projectsService'
import { DefaultGrowthApiClient } from '@/growth-api-client'

describe('projectsService', () => {
  const client = new DefaultGrowthApiClient('dummyurl')
  const projectsService = new ProjectsService(client)

  describe('getProjects', () => {
    it('given non-empty response from client should return valid entities', async () => {
      vi.spyOn(client, 'getProjects').mockResolvedValueOnce({
        _embedded: {
          projects: [
            {
              id: 1,
              name: 'Example',
              status: 'DELIVERED',
              dateDue: '',
              sourceLanguage: 'fi',
              targetLanguages: ['hu'],
              dateCreated: '',
              dateUpdated: '',
              _links: {
                self: {
                  href: ''
                },
                project: {
                  href: ''
                }
              }
            }
          ]
        }
      })
      const projects = await projectsService.getProjects()

      expect(projects.length).toBe(1)
    })
  })
})

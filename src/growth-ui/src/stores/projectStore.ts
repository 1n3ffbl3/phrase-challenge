import { DefaultGrowthApiClient } from '@/growth-api-client'
import type { Project } from '@/models/project'
import { ProjectsService } from '@/services/projectsService'
import { defineStore } from 'pinia'

export type ProjectStoreState = {
  projects: Project[]
  isLoading: boolean
  error: Record<string, unknown> | undefined
  isDebug: boolean
}

export type ProjectStoreGetters = {}

export type ProjectStoreActions = {
  loadProjects(): Promise<void>
}

const projectsService = new ProjectsService(new DefaultGrowthApiClient('http://localhost:5173/api'))

export const useProjectStore = defineStore<
  'project',
  ProjectStoreState,
  ProjectStoreGetters,
  ProjectStoreActions
>('project', {
  state: () => ({
    projects: [],
    isLoading: false,
    error: undefined,
    isDebug: true
  }),
  getters: {},
  actions: {
    async loadProjects() {
      const projects = await projectsService.getProjects()

      this.projects = projects
    }
  }
})

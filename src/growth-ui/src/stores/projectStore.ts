import { defineStore } from 'pinia'

export type ProjectStoreState = {
  projects: Project[]
  isLoading: boolean
  error: Record<string, unknown> | undefined
}

export type ProjectStoreGetters = {}

export type ProjectStoreActions = {
  loadProjects(): Promise<void>
}

export interface Project {
  id: string
  name: string
}

export const useProjectStore = defineStore<'project', ProjectStoreState, ProjectStoreGetters, ProjectStoreActions>('project', {
  state: () => ({
    projects: [],
    isLoading: false,
    error: undefined
  }),
  getters: {},
  actions: {
    async loadProjects() {
      const apiProjects = fetch('http://localhost:8090/projects')

      console.log(apiProjects)
    }
  }
})

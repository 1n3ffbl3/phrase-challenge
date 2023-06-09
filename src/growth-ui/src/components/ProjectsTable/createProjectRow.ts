import type { ProjectRow } from './ProjectsTable.vue'

export const createProjectRow = (project: Partial<ProjectRow>): ProjectRow => {
  return {
    id: 1,
    name: 'ProjectRow1',
    status: 'NEW',
    dueDate: '',
    sourceLanguage: 'fi',
    targetLanguages: 'sk',
    ...project
  }
}

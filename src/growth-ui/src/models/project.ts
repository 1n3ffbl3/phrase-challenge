import { type ProjectStatus } from './status'

export interface Project {
  id: number
  name: string
  status: ProjectStatus
  dueDate: Date
  sourceLanguage: string
  targetLanguages: string[]
  createdAt: Date
  updatedAt: Date
}

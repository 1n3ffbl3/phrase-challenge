import { describe, expect, it } from 'vitest'
import { createProjectRow } from './createProjectRow'
import type { ProjectRow } from './ProjectsTable.vue'

describe('createProjectRow', () => {
  it('should create a new ProjectRow with default values', () => {
    const projectRow = createProjectRow({})

    const expected: ProjectRow = {
      id: 1,
      name: 'ProjectRow1',
      status: 'NEW',
      dueDate: '',
      sourceLanguage: 'fi',
      targetLanguages: 'sk'
    }

    expect(projectRow).toEqual(expected)
  })

  it('should create a new ProjectRow with overridden values', () => {
    const projectRow = createProjectRow({
      id: 2,
      name: 'ProjectRow2',
      status: 'COMPLTETED',
      dueDate: '2023-06-08',
      sourceLanguage: 'en',
      targetLanguages: 'de'
    })

    const expected: ProjectRow = {
      id: 2,
      name: 'ProjectRow2',
      status: 'COMPLTETED',
      dueDate: '2023-06-08',
      sourceLanguage: 'en',
      targetLanguages: 'de'
    }

    expect(projectRow).toEqual(expected)
  })

  it('should create a new ProjectRow with some overridden values', () => {
    const projectRow = createProjectRow({
      name: 'ProjectRow3',
      status: 'DELIVERED'
    })

    const expected: ProjectRow = {
      id: 1,
      name: 'ProjectRow3',
      status: 'DELIVERED',
      dueDate: '',
      sourceLanguage: 'fi',
      targetLanguages: 'sk'
    }

    expect(projectRow).toEqual(expected)
  })
})

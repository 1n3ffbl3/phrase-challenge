import { describe, expect, it } from 'vitest'
import { sort } from './sort'
import type { ProjectRow } from './ProjectsTable.vue'
import type { ColumnKey } from './ProjectsTable.vue'
import { createProjectRow } from './createProjectRow'

describe('sort', () => {
  it('given both values as numbers when sorting in ascending order should sort correctly', () => {
    const rowA: ProjectRow = createProjectRow({ id: 5 })
    const rowB: ProjectRow = createProjectRow({ id: 10 })
    const sortKey: ColumnKey = 'id'
    const sortDirection = 'asc'

    const result = sort(rowA, rowB, sortKey, sortDirection)

    // Expect rowA to come before rowB
    expect(result).toBeLessThan(0)
  })

  it('given both values as numbers when sorting in descending order should sort correctly', () => {
    const rowA: ProjectRow = createProjectRow({ id: 5 })
    const rowB: ProjectRow = createProjectRow({ id: 10 })
    const sortKey: ColumnKey = 'id'
    const sortDirection = 'desc'

    const result = sort(rowA, rowB, sortKey, sortDirection)

    // Expect rowA to come after rowB
    expect(result).toBeGreaterThan(0)
  })

  it('given both values as strings when sorting in ascending order should sort correctly', () => {
    const rowA: ProjectRow = createProjectRow({ name: 'Jack' })
    const rowB: ProjectRow = createProjectRow({ name: 'Baron' })
    const sortKey: ColumnKey = 'name'
    const sortDirection = 'asc'

    const result = sort(rowA, rowB, sortKey, sortDirection)

    // Expect rowA to come after rowB
    expect(result).toBeGreaterThan(0)
  })

  it('given both values as strings when sorting in descending order should sort correctly', () => {
    const rowA: ProjectRow = createProjectRow({ name: 'Jack' })
    const rowB: ProjectRow = createProjectRow({ name: 'Baron' })
    const sortKey: ColumnKey = 'name'
    const sortDirection = 'desc'

    const result = sort(rowA, rowB, sortKey, sortDirection)

    // Expect rowA to come before rowB
    expect(result).toBeLessThan(0)
  })
})

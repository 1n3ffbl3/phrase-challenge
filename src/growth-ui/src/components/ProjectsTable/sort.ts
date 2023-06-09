import type { ColumnKey } from './ProjectsTable.vue'
import type { ProjectRow } from './ProjectsTable.vue'

export const sort = (a: ProjectRow, b: ProjectRow, sortKey: ColumnKey, sortDirection: string) => {
  const key = sortKey
  const valueA = a[key]
  const valueB = b[key]
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return (sortDirection === 'asc' ? 1 : -1) * (valueA - valueB)
  } else if (typeof valueA === 'number') {
    return sortDirection === 'asc' ? -1 : 1
  } else if (typeof valueB === 'number') {
    return sortDirection === 'asc' ? 1 : -1
  } else {
    return (sortDirection === 'asc' ? 1 : -1) * valueA.localeCompare(valueB)
  }
}

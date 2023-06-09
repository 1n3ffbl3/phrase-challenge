import type { Project } from '@/models/project'

export const calculateStatistics = (
  projects: Project[]
): {
  statusCount: {
    new: number
    delivered: number
    completed: number
  }
  dueDateInThePastCount: number
  prominentLanguage: string
} => {
  const groupedBySourceLanguage = projects.reduce(
    (acc: Record<string, number>, next: Project): Record<string, number> => {
      const counts = { ...acc }
      if (counts[next.sourceLanguage] !== undefined) {
        counts[next.sourceLanguage] += 1
      } else {
        counts[next.sourceLanguage] = 1
      }
      return counts
    },
    {} as Record<string, number>
  )

  const prominentCountsSorted = Object.entries(groupedBySourceLanguage).sort(
    ([, valueA], [, valueB]) => valueA - valueB
  )

  return {
    statusCount: {
      new: projects.filter((project) => project.status === 'NEW').length,
      delivered: projects.filter((project) => project.status === 'DELIVERED').length,
      completed: projects.filter((project) => project.status === 'COMPLETED').length
    },
    dueDateInThePastCount: projects.filter((project) => project.dueDate < new Date()).length,
    prominentLanguage:
      prominentCountsSorted && prominentCountsSorted[0] ? prominentCountsSorted[0][0] : ''
  }
}

import type { Column } from './ProjectsTable.vue'

export const projectListHeaders: Column[] = [
  {
    title: 'Id',
    sortable: true,
    key: 'id'
  },
  {
    title: 'Name',
    sortable: true,
    key: 'name'
  },
  {
    title: 'Status',
    sortable: true,
    key: 'status'
  },
  {
    title: 'Due date',
    sortable: true,
    key: 'dueDate'
  },
  {
    title: 'Source language',
    sortable: false,
    key: 'sourceLanguage'
  },
  {
    title: 'Target languages',
    sortable: false,
    key: 'targetLanguages'
  }
]

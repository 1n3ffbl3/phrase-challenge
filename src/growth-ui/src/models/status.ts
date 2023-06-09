export enum Status {
  NEW = 'NEW',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED'
}

export type ProjectStatus = keyof typeof Status

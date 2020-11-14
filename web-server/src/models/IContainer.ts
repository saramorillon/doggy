export interface IContainer {
  id: string
  image: string
  name: string
  port: string[]
  state: {
    endDate: string
    startDate: string
    status: 'running' | 'exited'
  }
}

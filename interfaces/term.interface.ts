import { EApplicationType } from './aplication-type.enum'
import { ICheckList } from './check-list.interface'

export interface ITerm {
  _id: string
  title: string
  content: string
  source: EApplicationType
  isPublish: boolean
  checkLists: ICheckList[]
  createdAt: string
  updatedAt: string
}

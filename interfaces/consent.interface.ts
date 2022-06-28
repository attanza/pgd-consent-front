import { ICheckList } from './check-list.interface'
import { ITerm } from './term.interface'

export interface IConsent {
  _id: string
  name: string
  nik: string
  phone: string
  email: string
  source: string
  term: ITerm
  checkLists: ICheckList[]
  createdAt: string
  updatedAt: string
}

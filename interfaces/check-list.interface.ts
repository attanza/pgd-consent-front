import { IConsent } from './consent.interface'
import { ITerm } from './term.interface'

export interface ICheckList {
  _id: string
  content: string
  source: string
  term: ITerm
  consent: IConsent
  createdAt: string
  updatedAt: string
}

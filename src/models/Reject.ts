import { Errors } from './Errors'

export interface Reject {
  status: 'Fail'
  errors: Errors[]
}

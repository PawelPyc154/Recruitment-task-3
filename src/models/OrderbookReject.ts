import { Errors } from './Errors'

export interface OrderbookReject {
  status: 'Fail'
  errors: Errors[]
}

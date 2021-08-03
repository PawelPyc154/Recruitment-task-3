import { OrderbookItem } from './OrderbookItem'

export interface OrderbookResponse {
  status: 'Ok'
  sell: OrderbookItem[]
  buy: OrderbookItem[]
  timestamp: string
  seqNo: string
}

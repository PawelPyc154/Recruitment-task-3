export interface TradingResponse {
  status: 'Ok'
  stats: {
    m: string
    h: string
    l: string
    v: string
    r24h: string
  }
}

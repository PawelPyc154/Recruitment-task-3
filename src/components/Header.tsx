// import axios from 'axios'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import 'twin.macro'
import { TradingResponse } from '../models/TradingResponse'
import { Reject } from '../models/Reject'

interface HeaderProps {
  timestamp: string
}

const Header = ({ timestamp }: HeaderProps) => {
  const { data } = useQuery({
    queryKey: 'trading',
    refetchInterval: 5000,
    queryFn: () =>
      axios.get<TradingResponse | Reject>(`https://api.bitbay.net/rest/trading/stats/${'BTC-PLN'}`).then((res) => {
        if (res.data.status === 'Ok') {
          return res.data
        }

        throw new Error(res.data.errors[0])
      }),
  })
  return (
    <header tw="bg-gray-600 flex justify-between items-center py-2 px-4 text-sm">
      <div>select</div>
      <div>Spread: {timestamp}</div>
      <div tw="text-xs">
        <div tw="text-green-500">max {data?.stats?.h}</div>
        <div tw="text-red-600">min {data?.stats?.l}</div>
      </div>
    </header>
  )
}

export { Header }

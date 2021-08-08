// import axios from 'axios'
import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'
import { TradingResponse } from '../models/TradingResponse'
import { Reject } from '../models/Reject'
import { MenuSelectCurrencyCoin } from './menuSelectCurrencyCoin'

interface HeaderProps {
  timestamp?: string
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ timestamp, currency, setCurrency, coin, setCoin }: HeaderProps) => {
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
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  return (
    <Container>
      <MenuSelectCurrencyCoin
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
        currency={currency}
        setCurrency={setCurrency}
        coin={coin}
        setCoin={setCoin}
      />
      <div tw="flex items-center">Spread: {timestamp || <LoaderBox />}</div>
      <Wrapper>
        <MaxRate>
          Highest rate:
          {data?.stats?.h || <LoaderBox tw="h-4" />}
        </MaxRate>
        <MinRate>
          Smallest rate:
          {data?.stats?.l || <LoaderBox tw="h-4" />}
        </MinRate>
      </Wrapper>
    </Container>
  )
}

export { Header }

const Container = tw.header`flex justify-between items-center py-2 pr-4 pl-0 text-sm border-b border-gray-200`
const Wrapper = tw.div`text-xs flex flex-col items-end text-right`
const MaxRate = tw.div`text-green-500 flex items-center`
const MinRate = tw.div`text-red-600 flex items-center`
const LoaderBox = tw.div`bg-gray-100 rounded-lg border-4 border-white h-7 animate-pulse w-20`

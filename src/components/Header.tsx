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
  currencyCurrent: string
  setCurrencyCurrent: React.Dispatch<React.SetStateAction<string>>
  coinCurrent: string
  setCoinCurrent: React.Dispatch<React.SetStateAction<string>>
}
const Header = ({ timestamp, currencyCurrent, setCurrencyCurrent, coinCurrent, setCoinCurrent }: HeaderProps) => {
  const { data } = useQuery({
    queryKey: `trading-${coinCurrent}-${currencyCurrent}`,
    refetchInterval: 5000,
    queryFn: () =>
      axios
        .get<TradingResponse | Reject>(
          `https://api.bitbay.net/rest/trading/stats/${`${coinCurrent}-${currencyCurrent}`}`
        )
        .then((res) => {
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
        currencyCurrent={currencyCurrent}
        setCurrencyCurrent={setCurrencyCurrent}
        coinCurrent={coinCurrent}
        setCoinCurrent={setCoinCurrent}
      />
      <div tw="flex items-center">Spread: {timestamp || <LoaderBox />}</div>
      <Wrapper>
        <MaxRate>
          Najwyższy kurs od 24h:
          <span tw="font-bold pl-1 text-green-500">
            {' '}
            {Number(data?.stats?.h).toFixed(2) || <LoaderBox tw="h-4" />}{' '}
          </span>
        </MaxRate>
        <MinRate>
          Najniższy kurs od 24h:
          <span tw="font-bold pl-1 text-red-600"> {Number(data?.stats?.l).toFixed(2) || <LoaderBox tw="h-4" />} </span>
        </MinRate>
      </Wrapper>
    </Container>
  )
}

export { Header }

const Container = tw.header`flex flex-col md:flex-row justify-between items-center py-2 pr-4 pl-0 text-xs md:text-sm border-b border-gray-200`
const Wrapper = tw.div`text-xs flex flex-col items-end text-right`
const MaxRate = tw.div`text-green-500 flex items-center`
const MinRate = tw.div`text-red-500 flex items-center`
const LoaderBox = tw.div`bg-gray-100 rounded-lg border-4 border-white h-7 animate-pulse w-20`

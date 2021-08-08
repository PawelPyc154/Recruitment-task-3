import React, { useState } from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'
import axios from 'axios'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Column } from './components/Column'
import { Header } from './components/Header'
import { Reject } from './models/Reject'
import { OrderbookResponse } from './models/OrderbookResponse'

const App = () => {
  const [currencyCurrent, setCurrencyCurrent] = useState('PLN')
  const [coinCurrent, setCoinCurrent] = useState('BTC')

  const { data, isLoading } = useQuery({
    queryKey: `orderbook${`${coinCurrent}-${currencyCurrent}`}`,
    refetchInterval: 5000,
    queryFn: () =>
      axios
        .get<OrderbookResponse | Reject>(
          `https://api.bitbay.net/rest/trading/orderbook-limited/${`${coinCurrent}-${currencyCurrent}`}/10`
        )
        .then((res) => {
          if (res.data.status === 'Ok') {
            return res.data
          }
          throw new Error(res.data.errors[0])
        }),
  })

  return (
    <Container>
      <Header
        timestamp={data?.timestamp}
        currencyCurrent={currencyCurrent}
        setCurrencyCurrent={setCurrencyCurrent}
        coinCurrent={coinCurrent}
        setCoinCurrent={setCoinCurrent}
      />
      <Wrapper>
        <Column
          list={data?.buy}
          variant="bid"
          isLoading={isLoading}
          currencyCurrent={currencyCurrent}
          coinCurrent={coinCurrent}
        />
        <Column
          list={data?.sell}
          variant="ask"
          isLoading={isLoading}
          currencyCurrent={currencyCurrent}
          coinCurrent={coinCurrent}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </Wrapper>
    </Container>
  )
}

export default App

const Container = tw.main`bg-white mx-auto max-w-5xl lg:mt-20 rounded-xl overflow-hidden shadow-2xl`
const Wrapper = tw.div`grid lg:grid-cols-2 divide-x divide-gray-200 overflow-x-auto md:overflow-visible`

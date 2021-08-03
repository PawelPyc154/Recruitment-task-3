import React from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'
import axios from 'axios'
import { Column } from './components/Column'
import { Header } from './components/Header'
import { OrderbookReject } from './models/OrderbookReject'
import { OrderbookResponse } from './models/OrderbookResponse'

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: 'orderbook',
    refetchInterval: 1000,
    queryFn: () =>
      axios
        .get<OrderbookResponse | OrderbookReject>(
          'https://api.bitbay.net/rest/trading/orderbook-limited/BTC-PLN/10'
        )
        .then((res) => {
          if (res.data.status === 'Ok') {
            return res.data
          }
          throw new Error(res.data.errors[0])
        }),
  })

  console.log(isLoading, error, data)
  return (
    <Container>
      <Header />
      <Wrapper>
        {data && (
          <>
            <Column list={data.buy} />
            <Column list={data.sell} />
          </>
        )}
      </Wrapper>
    </Container>
  )
}

export default App

const Container = tw.main`bg-gray-600 mx-auto max-w-2xl mt-20`
const Wrapper = tw.div`grid grid-cols-2 divide-x p-1`

import React from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'
import axios from 'axios'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Column } from './components/Column'
import { Header } from './components/Header'
import { Reject } from './models/Reject'
import { OrderbookResponse } from './models/OrderbookResponse'

const App = () => {
  const { data } = useQuery({
    queryKey: 'orderbook',
    refetchInterval: 5000,
    queryFn: () =>
      axios
        .get<OrderbookResponse | Reject>('https://api.bitbay.net/rest/trading/orderbook-limited/BTC-PLN/10')
        .then((res) => {
          if (res.data.status === 'Ok') {
            return res.data
          }
          // console.log(res.data.errors[0])
          throw new Error(res.data.errors[0])
        }),
  })
  // console.log(error)

  return (
    <Container>
      {data && (
        <>
          <Header timestamp={data?.timestamp} />
          <Wrapper>
            <>
              <Column list={data.buy || []} variant="bid" />
              <Column list={data.sell || []} variant="ask" />
            </>
            <ReactQueryDevtools initialIsOpen={false} />
          </Wrapper>
        </>
      )}
    </Container>
  )
}

export default App

const Container = tw.main`bg-gray-700 mx-auto max-w-5xl mt-20 border border-gray-800`
const Wrapper = tw.div`grid grid-cols-2 divide-x p-1  divide-gray-800`

import React from 'react'
import tw from 'twin.macro'

import { OrderbookItem } from '../models/OrderbookItem'
import Table from './Table'

interface ColumnProps {
  list?: OrderbookItem[]
  variant: 'bid' | 'ask'
  isLoading: boolean
  currencyCurrent: string
  coinCurrent: string
}
const Column = ({ list = [], variant, isLoading, currencyCurrent, coinCurrent }: ColumnProps) => (
  <Container>
    <Heading>
      {variant === 'bid' ? (
        <>
          Oferty skupu - <span tw="text-green-500 font-bold">BID</span>
        </>
      ) : (
        <>
          Oferty sprzedaży - <span tw="text-red-500 font-bold"> ASK</span>
        </>
      )}
    </Heading>
    <Table data={list} isLoading={isLoading} currencyCurrent={currencyCurrent} coinCurrent={coinCurrent} />
  </Container>
)

export { Column }

const Container = tw.section`p-1 md:p-2 flex flex-col`
const Heading = tw.header`mx-auto block w-auto`

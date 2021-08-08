import React from 'react'
import tw from 'twin.macro'

import { OrderbookItem } from '../models/OrderbookItem'
import Table from './Table'

interface ColumnProps {
  list?: OrderbookItem[]
  variant: 'bid' | 'ask'
  isLoading: boolean
}

const Column = ({ list = [], variant, isLoading }: ColumnProps) => (
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
    <Table data={list} isLoading={isLoading} />
  </Container>
)

export { Column }

const Container = tw.section`p-2 flex flex-col`
const Heading = tw.header`mx-auto block w-auto`

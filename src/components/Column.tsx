import React from 'react'
import tw from 'twin.macro'

import { List } from './List'
import { OrderbookItem } from '../models/OrderbookItem'

interface ColumnProps {
  list: OrderbookItem[]
}
const Column = ({ list }: ColumnProps) => (
  <Container>
    <Hedding>bio</Hedding>
    <List list={list} />
  </Container>
)

export { Column }

const Container = tw.section`p-2 flex flex-col`
const Hedding = tw.header`mx-auto block w-auto`

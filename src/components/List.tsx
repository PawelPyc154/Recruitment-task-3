import React from 'react'
import { ListItem } from './ListItem'
import { OrderbookItem } from '../models/OrderbookItem'

interface ListProps {
  list: OrderbookItem[]
}
const List = ({ list }: ListProps) => (
  <>
    {list.map((item) => (
      <ListItem key={item.ra} {...item} />
    ))}
  </>
)

export { List }

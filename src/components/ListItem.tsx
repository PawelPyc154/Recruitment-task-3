import React from 'react'
import { OrderbookItem } from '../models/OrderbookItem'

const ListItem = ({ co, pa }: OrderbookItem) => (
  <div>
    {co}
    {pa}
  </div>
)

export { ListItem }

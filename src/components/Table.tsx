import React from 'react'
import { Column, useTable } from 'react-table'
import { OrderbookItem } from '../models/OrderbookItem'
import 'twin.macro'

interface TableProps {
  data: OrderbookItem[]
}
const Table = ({ data }: TableProps) => {
  const columns: Column<OrderbookItem>[] = React.useMemo(
    () => [
      {
        Header: 'Kurs',
        accessor: 'ra',
        Cell: ({ value }) => Number(value).toFixed(6),
      },
      {
        Header: 'Ilość BTC',
        accessor: 'ca',
        Cell: ({ value }) => Number(value).toFixed(6),
      },
      {
        Header: 'Suma PLN',
        accessor: 'pa',
        Cell: ({ row }) => (Number(row.original.ca) * Number(row.original.ra)).toFixed(6),
      },
      {
        Header: 'Liczba ofert',
        accessor: 'co',
        Cell: ({ value }) => Number(value),
      },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()} tw="text-sm">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} tw="p-3 px-1 text-left">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} tw="p-1 text-left">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default Table

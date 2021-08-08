import React from 'react'
import { Column, useFlexLayout, useTable } from 'react-table'
import { OrderbookItem } from '../models/OrderbookItem'
import 'twin.macro'

interface TableProps {
  data: OrderbookItem[]
  isLoading: boolean
  currencyCurrent: string
  coinCurrent: string
}
const Table = ({ data, isLoading, currencyCurrent, coinCurrent }: TableProps) => {
  const columns: Column<OrderbookItem>[] = React.useMemo(
    () => [
      {
        Header: 'Kurs',
        accessor: 'ra',
        width: 90,
        Cell: ({ value }) => Number(value).toFixed(6),
      },
      {
        Header: `Ilość ${coinCurrent}`,
        accessor: 'ca',
        width: 90,
        Cell: ({ value }) => Number(value).toFixed(6),
      },
      {
        Header: `Suma ${currencyCurrent}`,
        accessor: 'pa',
        width: 100,
        Cell: ({ row }) => (Number(row.original.ca) * Number(row.original.ra)).toFixed(6),
      },
      {
        Header: 'Liczba ofert',
        accessor: 'co',
        width: 85,
        Cell: ({ value }) => Number(value),
      },
    ],
    [coinCurrent, currencyCurrent]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useFlexLayout
  )

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
        {isLoading &&
          Array.from({ length: 10 }, (v, i) => i).map((item) => (
            <tr tw="bg-gray-100 rounded-lg border-4 border-white h-7 animate-pulse" key={item}>
              {Array.from({ length: 4 }, (v, i) => i).map((i) => (
                <td key={i} />
              ))}
            </tr>
          ))}
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

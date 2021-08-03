import React from 'react'
import 'twin.macro'

const Header = () => (
  <header tw="bg-gray-700 text-white flex justify-between items-center py-2 px-4 text-sm">
    <div>select</div>
    <div>Spread: todo</div>
    <div tw="text-xs">
      <div>24h max</div>
      <div>24h min</div>
    </div>
  </header>
)

export { Header }

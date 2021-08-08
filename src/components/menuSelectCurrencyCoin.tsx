import React from 'react'
import tw from 'twin.macro'

interface MenuSelectCurrencyCoinProps {
  isOpenMenu: boolean
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
  coin: string
  setCoin: React.Dispatch<React.SetStateAction<string>>
}
const MenuSelectCurrencyCoin = ({
  isOpenMenu,
  setIsOpenMenu,
  currency,
  setCurrency,
  coin,
  setCoin,
}: MenuSelectCurrencyCoinProps) => {
  console.log(currency, setCurrency, coin, setCoin)
  return (
    <Container>
      <Button onClick={() => setIsOpenMenu((prev) => !prev)}>
        BTC <Images src="/arrow-down.svg" alt="" tw="h-2 ml-2" />
      </Button>
      {isOpenMenu && <MenuWrapper>test</MenuWrapper>}
    </Container>
  )
}

export { MenuSelectCurrencyCoin }

const Container = tw.div`relative`
const Button = tw.button`flex justify-center items-center py-2 px-4 hover:bg-gray-100 focus:(outline-none bg-gray-100) `
const Images = tw.img`h-3 ml-2`
const MenuWrapper = tw.div`absolute bg-white w-60 h-40 text-black transform translate-y-full -bottom-2 left-0 p-3 shadow-xl border border-gray-200`

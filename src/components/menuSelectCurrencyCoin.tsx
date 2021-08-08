import React from 'react'
import tw, { styled } from 'twin.macro'

const currencyList = ['PLN', 'EUR', 'USD', 'USDT', 'GBP']
const coinList = [
  'BTC',
  'ETH',
  'LSK',
  'LTC',
  'GAME',
  'DASH',
  'BCC',
  'BTG',
  'XRP',
  'ZEC',
  'GNT',
  'OMG',
  'ZRX',
  'PAY',
  'BAT',
  'REP',
  'NEU',
  'TRX',
  'BSV',
  'XLM',
  'LINK',
  'AAVE',
  'COMP',
  'DAI',
  'DOT',
  'EOS',
  'GRT',
  'LUNA',
  'MANA',
  'SUSHI',
  'UNI',
  'XTZ',
  'CHZ',
  'ENJ',
  'MATIC',
  'DOGE',
  'ATRI',
  'WIS',
]

interface MenuSelectCurrencyCoinProps {
  isOpenMenu: boolean
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  currencyCurrent: string
  setCurrencyCurrent: React.Dispatch<React.SetStateAction<string>>
  coinCurrent: string
  setCoinCurrent: React.Dispatch<React.SetStateAction<string>>
}
const MenuSelectCurrencyCoin = ({
  isOpenMenu,
  setIsOpenMenu,
  currencyCurrent,
  setCurrencyCurrent,
  coinCurrent,
  setCoinCurrent,
}: MenuSelectCurrencyCoinProps) => (
  <Container>
    <Button onClick={() => setIsOpenMenu((prev) => !prev)}>
      {coinCurrent} - {currencyCurrent} <Images src="/arrow-down.svg" alt="" tw="h-2 ml-2" />
    </Button>
    {isOpenMenu && (
      <MenuWrapper>
        <Label>Currency:</Label>
        <div>
          {currencyList.map((currency) => (
            <CurrancyButton
              key={currency}
              onClick={() => setCurrencyCurrent(currency)}
              type="button"
              isCurrent={currency === currencyCurrent}
            >
              {currency}
            </CurrancyButton>
          ))}
        </div>
        <Label tw="mt-4">Coin:</Label>
        <div>
          {coinList.map((coin) => (
            <CurrancyButton
              key={coin}
              onClick={() => {
                setCoinCurrent(coin)
                setIsOpenMenu(false)
              }}
              type="button"
              isCurrent={coin === coinCurrent}
            >
              {coin}
            </CurrancyButton>
          ))}
        </div>
      </MenuWrapper>
    )}
  </Container>
)

export { MenuSelectCurrencyCoin }

const Container = tw.div`relative select-none `
const Button = tw.button`flex justify-center items-center py-2 px-4 hover:bg-gray-100 focus:(outline-none ring-2)`
const Images = tw.img`h-3 ml-2`
const MenuWrapper = tw.div`absolute bg-white w-96 text-black transform translate-y-full -bottom-2 left-0 p-3 shadow-xl border border-gray-200 z-40`
const Label = tw.div`text-xs font-bold mb-2 font-sans text-gray-600`
const CurrancyButton = styled.button(({ isCurrent }: { isCurrent: boolean }) => [
  tw`bg-gray-200 py-1 px-2 rounded-sm mr-2 mb-2 hover:(bg-yellow-300 text-white) focus:(outline-none ring-2)`,
  isCurrent && tw`bg-yellow-400 text-white`,
])

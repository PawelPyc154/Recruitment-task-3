import React from 'react'
import tw from 'twin.macro'
import { Column } from './components/Column'
import { Header } from './components/Header'

const App = () => (
  <Container>
    <Header />
    <Wrapper>
      <Column />
      <Column />
    </Wrapper>
  </Container>
)

export default App

const Container = tw.main`bg-gray-600 mx-auto max-w-2xl mt-20`
const Wrapper = tw.div`grid grid-cols-2 divide-x`

import React from 'react'
import tw from 'twin.macro'

import { ListItem } from './ListItem'

const Column = () => (
  <Container>
    <Hedding>bio</Hedding>
    <ListItem />
  </Container>
)

export { Column }

const Container = tw.section`p-2 flex flex-col`
const Hedding = tw.header`mx-auto block w-auto`

import * as React from 'react'
import { ContainerWrapper } from 'components/Wrappers/ContainerWrapper'
import TransactionsTable from './TransactionsTable'

export default function Portfolio() {
  return (
    <ContainerWrapper>
      <TransactionsTable />
    </ContainerWrapper>
  )
}

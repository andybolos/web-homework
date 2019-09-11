import * as React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import Transactions from './Transactions'

import { Button } from '../utitlites/BaseStyles'

const TransactionView = () => {
  return (
    <div css={ViewStyles}>
      <div css={TransactionViewHeader}>
        <h1>Transactions</h1>
        <Link to='/transaction-form'><Button>Add Transaction</Button></Link>
      </div>
      <Transactions />
      <h2>Render a graph or something here</h2>
    </div>
  )
}

const ViewStyles = css`
  font-family: Helvetica, Arial, sans-serif;
  color: #454545;
  margin: 24px 48px;
`

const TransactionViewHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & h1 {
    font-weight: normal;
  }
`

export default TransactionView

import * as React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import Transactions from './Transactions'
import { TransactionsChart } from './TransactionsChart'
import { TRANSACTIONS_QUERY } from '../utilities/queries'

import { Button } from '../utilities/BaseStyles'

const TransactionView = () => {
  const { loading, error, data } = useQuery(TRANSACTIONS_QUERY)

  if (loading) return 'Loading.. Please wait.'
  if (error) return 'Whooops... looks like somethings wrong.. try refreshing?'

  return (
    <div css={ViewStyles}>
      <div css={TransactionViewHeader}>
        <h1>Transactions</h1>
        <Link to='/transaction-form'><Button>Add Transaction</Button></Link>
      </div>
      { data && data.transactions.length
        ? <Transactions transactions={data.transactions} />
        : <h5>No transactions, Please add some transactions</h5>
      }
      <h2>Render a graph or something here</h2>
      <TransactionsChart transactions={data.transactions} />
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

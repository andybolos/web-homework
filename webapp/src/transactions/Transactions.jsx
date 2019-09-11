import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { Button } from '../utilities/BaseStyles'
import { REMOVE_TRANSACTION, TRANSACTIONS_QUERY } from '../utilities/queries'

const Transactions = (transactions) => {
  return (
    <>
      {transactions.transactions.map(transaction => <TransactionCard key={`Transaction_${transaction.id}`} transaction={transaction} />)}

    </>
  )
}

const TransactionCard = (transaction) => {
  const [removeTransaction] = useMutation(REMOVE_TRANSACTION)
  const { id, amount, credit, description } = transaction.transaction

  return (
    <div css={TransactionCardStyle}>
      <div css={TransactionCardItem}>
        <div css={TransactionCardLabel}>Amount</div>
        ${amount}
      </div>
      <div css={TransactionCardItem}>
        <div css={TransactionCardLabel}>Card type</div>
        {credit ? 'Credit' : 'Debit' }
      </div>
      <div css={TransactionCardItem}>
        <div css={TransactionCardLabel}>Card type</div>
        {description}
      </div>
      <div>
        <Button delete onClick={() =>
          removeTransaction({
            variables: {
              id: id
            },
            refetchQueries: [{
              query: TRANSACTIONS_QUERY
            }]
          })}>Delete</Button>
      </div>
    </div>
  )
}

const TransactionCardStyle = css`
  height: 50px;
  border: 1px solid #b5b5b5;
  margin-bottom: 4px;
  padding: 4px 16px;
  border-radius 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TransactionCardItem = css`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const TransactionCardLabel = css`
  color: #b5b5b5;
  font-size: 10px; 
  padding-bottom: 4px;
`

export default Transactions

import * as React from 'react'
import { Query,
  Mutation
} from 'react-apollo'
import gql from 'graphql-tag'
import { css } from '@emotion/core'
import { Button } from '../utitlites/BaseStyles'

const Transactions = () => {
  return (
    <>
      <Query query={TRANSACTIONS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h2>Loading.. Please wait</h2>
          if (error) return <h5>There was an Error..</h5>

          const transactionsToRender = data.transactions

          return (
            <div>
              {transactionsToRender.map(transaction => <TransactionCard key={`Transaction_${transaction.id}`} transaction={transaction} />)}
            </div>
          )
        }}
      </Query>
    </>
  )
}

const TransactionCard = (transaction) => {
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
        <Mutation mutation={REMOVE_TRANSACTION}>
          {(removeTransaction) => (
            <Button delete onClick={() =>
              removeTransaction({
                variables: {
                  id: id
                },
                refetchQueries: [{
                  query: TRANSACTIONS_QUERY
                }]
              })}>Delete</Button>
          )}
        </Mutation>
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

export const TRANSACTIONS_QUERY = gql`
  {
    transactions {
      id
      amount
      credit
      debit
      description
    }
  }
`

const REMOVE_TRANSACTION = gql`
  mutation RemoveTransaction(
    $id: String!
  ) {
    removeTransaction(
      id: $id
    ) {
      id
    }
  }
`

export default Transactions

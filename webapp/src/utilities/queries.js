import gql from 'graphql-tag'

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

export const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $amount: Float!
    $credit: Boolean!
    $debit: Boolean!
    $description: String!
  ) {
    addTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
    ) {
        id      
        amount
        credit
        debit
        description
      }

  }
`

export const REMOVE_TRANSACTION = gql`
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

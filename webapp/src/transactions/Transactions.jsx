import * as React from 'react'
import { Query,
  Mutation
} from 'react-apollo'
import gql from 'graphql-tag'

const TransactionForm = () => {
  const [formValues, setFormValues] = React.useState({})

  const handleChange = (e) => {
    e.persist()
    if (e.target.value === 'credit') {
      setFormValues(formValues => ({
        ...formValues,
        credit: true,
        debit: false
      }))
    } else if (e.target.value === 'debit') {
      setFormValues(formValues => ({
        ...formValues,
        debit: true,
        credit: false
      }))
    } else {
      setFormValues(formValues => ({
        ...formValues,
        [e.target.name]: e.target.value
      }))
    }
  }

  return (
    <div>
      <Mutation mutation={ADD_TRANSACTION}>
        {(addTrasaction) => {
          return (
            <form onSubmit={e => {
              e.preventDefault()
              addTrasaction({
                variables: {
                  amount: parseFloat(formValues.amount),
                  credit: !!formValues.credit,
                  debit: !!formValues.debit,
                  description: formValues.description
                }
              })
            }}>
              <label>
                Amount:
                <input
                  name='amount'
                  onChange={handleChange}
                  type='text'
                  value={formValues.amount || ''}
                />
              </label>
              <label>
                Credit
                <input checked={formValues.credit} name='cardType' onChange={handleChange} type='radio' value='credit' />
              </label>
              <label>
                Debit
                <input checked={formValues.debit} name='cardType' onChange={handleChange} type='radio' value='debit' />
              </label>
              <label>
          Description:
                <input
                  name='description'
                  onChange={handleChange}
                  type='text'
                  value={formValues.description || ''}
                />
              </label>

              <button type='submit'>Add</button>
            </form>
          )
        }}
      </Mutation>
    </div>
  )
}

const Transactions = () => {
  return (
    <>
      <h1>We will put transactions here</h1>
      <TransactionForm />
      <Query query={TRANSACTIONS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h2>Loading.. Please wait</h2>
          if (error) return <h5>There was an Error..</h5>

          const transactionsToRender = data.transactions

          return (
            <div>
              <h2>Transactions</h2>
              {transactionsToRender && transactionsToRender.length ? (
                <ul>
                  {transactionsToRender.map(transaction => {
                    return (
                      <>
                        <li>Amount: ${transaction.amount}</li>
                        <li>Card type: {transaction.credit ? 'Credit' : 'Debit' }</li>
                        <li>Description: {transaction.description}</li>
                      </>
                    )
                  })}
                </ul>
              ) : <h3>Nothing to render.. add some transactions</h3>}
            </div>
          )
        }}
      </Query>
    </>
  )
}

const TRANSACTIONS_QUERY = gql`
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

const ADD_TRANSACTION = gql`
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

export default Transactions

import * as React from 'react'
import {
  Mutation
} from 'react-apollo'
import gql from 'graphql-tag'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import { Button } from '../utitlites/BaseStyles'
import { TRANSACTIONS_QUERY } from './Transactions'

const TransactionForm = () => {
  const [formValues, setFormValues] = React.useState({})
  const [showSuccess, setShowSuccess] = React.useState(false)

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
    <div css={TransactionFormCard}>
      {showSuccess &&
        <div>Transaction added</div>
      }
      <Mutation mutation={ADD_TRANSACTION} onCompleted={() => setShowSuccess(true)}>
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
                },
                refetchQueries: [{
                  query: TRANSACTIONS_QUERY
                }]
              })
            }}>
              <div css={TransactionFormCardRow}>
                <label>
                  Amount
                  <input
                    name='amount'
                    onChange={handleChange}
                    type='text'
                    value={formValues.amount || ''}
                  />
                </label>
              </div>
              <div css={TransactionFormCardRow}>
                <label id='radio'>
                  Credit
                  <input
                    checked={formValues.credit}
                    name='cardType'
                    onChange={handleChange}
                    type='radio'
                    value='credit'
                  />
                </label>
                <label id='radio'>
                  Debit
                  <input
                    checked={formValues.debit}
                    name='cardType'
                    onChange={handleChange}
                    type='radio' value='debit' />
                </label>
              </div>
              <div css={TransactionFormCardRow}>
                <label>
                  Description
                  <input
                    name='description'
                    onChange={handleChange}
                    type='text'
                    value={formValues.description || ''}
                  />
                </label>
              </div>
              <div css={ActionsRow}>
                <Link to='/transactions'><Button delete>Go back</Button></Link>
                <Button type='submit'>Add</Button>
              </div>
            </form>
          )
        }}
      </Mutation>
    </div>
  )
}

const TransactionFormCard = css`
  font-family: Helvetica, Arial, sans-serif;
  color: #454545;
  margin: 24px 48px;
  border: 1px solid #b5b5b5;
  border-radius: 4px;
  padding: 24px;
`

const TransactionFormCardRow = css`
  margin-bottom: 8px;

  & input {
    margin : 8px;
    font-size: 14px;
  }
`

const ActionsRow = css`
  display: flex;
  justify-content: center;
  margin-top: 36px;

  & a {
    margin-right: 24px;
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

export default TransactionForm

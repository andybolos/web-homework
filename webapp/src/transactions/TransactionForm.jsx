import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import { Button } from '../utilities/BaseStyles'
import { ADD_TRANSACTION, TRANSACTIONS_QUERY } from '../utilities/queries'

const TransactionForm = () => {
  const initialFormState = {
    amount: '',
    credit: false,
    debit: false,
    description: ''
  }

  const [formState, setFormState] = React.useState(initialFormState)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [addTransaction] = useMutation(ADD_TRANSACTION)

  const handleChange = (e) => {
    e.persist()
    if (e.target.value === 'credit') {
      setFormState(formState => ({
        ...formState,
        credit: true,
        debit: false
      }))
    } else if (e.target.value === 'debit') {
      setFormState(formState => ({
        ...formState,
        debit: true,
        credit: false
      }))
    } else {
      setFormState(formState => ({
        ...formState,
        [e.target.name]: e.target.value
      }))
    }
  }

  const clearFormState = () => {
    setFormState({ ...initialFormState })
  }

  return (
    <div css={TransactionFormCard}>
      {showSuccess &&
        <div>Transaction added</div>
      }
      <form onSubmit={e => {
        e.preventDefault()
        addTransaction({
          variables: {
            amount: parseFloat(formState.amount),
            credit: !!formState.credit,
            debit: !!formState.debit,
            description: formState.description
          },
          refetchQueries: [{
            query: TRANSACTIONS_QUERY
          }]
        })
        setShowSuccess(true)
        clearFormState()
      }}>
        <div css={TransactionFormCardRow}>
          <label>
            Amount
            <input
              name='amount'
              onChange={handleChange}
              type='text'
              value={formState.amount || ''}
            />
          </label>
        </div>
        <div css={TransactionFormCardRow}>
          <label id='radio'>
            Credit
            <input
              checked={formState.credit}
              name='cardType'
              onChange={handleChange}
              type='radio'
              value='credit'
            />
          </label>
          <label id='radio'>
            Debit
            <input
              checked={formState.debit}
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
              value={formState.description || ''}
            />
          </label>
        </div>
        <div css={ActionsRow}>
          <Link to='/transactions'><Button delete>Go back</Button></Link>
          <Button type='submit'>Add</Button>
        </div>
      </form>
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

export default TransactionForm

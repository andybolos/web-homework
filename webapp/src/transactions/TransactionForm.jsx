import * as React from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import { Button } from '../utilities/BaseStyles'
import {
  ADD_TRANSACTION,
  TRANSACTIONS_QUERY,
  EDIT_TRANSACTIONS_QUERY,
  UPDATE_TRANSACTION
} from '../utilities/queries'

const TransactionForm = (props) => {
  const initialFormState = {
    amount: '',
    credit: false,
    debit: false,
    description: ''
  }

  const [transactionId, setTransactionId] = React.useState('')
  const [isEditForm, setIsEditForm] = React.useState(false)
  const [formState, setFormState] = React.useState(initialFormState)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showFailure, setShowFailure] = React.useState(false)
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    onCompleted ({ addTransaction }) {
      setShowSuccess(true)
      clearFormState()
    },
    onError ({ addTransaction }) {
      setShowFailure(true)
    }
  })
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    onCompleted ({ updateTransaction }) {
      setShowSuccess(true)
      clearFormState()
    },
    onError ({ updateTransaction }) {
      setShowFailure(true)
    }
  })
  const [queryEditTransaction, { called, data }] = useLazyQuery(EDIT_TRANSACTIONS_QUERY, {
    variables: { id: transactionId } // eslint-disable-line
  })

  React.useEffect(() => {
    if (props.match.params.id) { //eslint-disable-line
      setTransactionId(props.match.params.id)//eslint-disable-line
    }
  })

  React.useEffect(() => {
    if (!called && transactionId) {
      queryEditTransaction()
      setIsEditForm(true)
    }
  })

  React.useEffect(() => {
    if (data && isEditForm) {
      setFormState(() => ({
        ...data.transaction
      }))
      setIsEditForm(false)
    }
  })

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
      <h1>{transactionId ? 'Edit' : 'Add'} transaction</h1>
      {showSuccess && !transactionId &&
        <span className='success'>Transaction added</span>
      }
      {showSuccess && transactionId &&
        <span className='success'>Transaction updated</span>
      }
      {showFailure &&
        <span className='fail'>Whoops something went wrong.. try again?</span>
      }
      <form onSubmit={e => {
        e.preventDefault()
        if (transactionId) {
          updateTransaction({
            variables: {
              id: formState.id,
              amount: parseFloat(formState.amount),
              credit: !!formState.credit,
              debit: !!formState.debit,
              description: formState.description
            },
            refetchQueries: [{
              query: TRANSACTIONS_QUERY
            }]
          })
        } else {
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
        }
      }}>
        <div css={TransactionFormCardRow}>
          <label>
            Amount
            <input
              name='amount'
              onChange={handleChange}
              onFocus={() => {
                setShowFailure(false)
                setShowSuccess(false)
              }}
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
              onFocus={() => {
                setShowFailure(false)
                setShowSuccess(false)
              }}
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
              onFocus={() => {
                setShowFailure(false)
                setShowSuccess(false)
              }}
              type='radio'
              value='debit'
            />
          </label>
        </div>
        <div css={TransactionFormCardRow}>
          <label>
            Description
            <input
              name='description'
              onChange={handleChange}
              onFocus={() => {
                setShowFailure(false)
                setShowSuccess(false)
              }}
              type='text'
              value={formState.description || ''}
            />
          </label>
        </div>
        <div css={ActionsRow}>
          <Link to='/transactions'><Button delete>Go back</Button></Link>
          {transactionId
            ? <Button type='submit'>Update</Button>
            : <Button type='submit'>Add</Button>
          }
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

  & h1 {
    margin: 0;
    margin-bottom: 24px;
  }

  & form {
    margin-top: 8px;
  }

  & span.success {
    color: #0ADB92
  }
  & span.fail {
    color: #C14032;
  }
`

const TransactionFormCardRow = css`
  margin-bottom: 8px;

  & input {
    margin: 0 8px;
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

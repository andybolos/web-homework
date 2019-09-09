import * as React from 'react'

const TransactionForm = () => {
  const [formValues, setFormValues] = React.useState({})

  const handleChange = (e) => {
    e.persist()
    setFormValues(formValues => ({
      ...formValues,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formValues)
  }

  return (
    <div>
      <form>
        <label name='amount'>
          Amount:
          <input
            name='amount'
            onChange={handleChange}
            type='text'
            value={formValues.amount || ''}
          />
        </label>
        <label name='cardType'>
          Select one
          <select name='cardType' onBlur={handleChange}>
            <option value='credit'>Credit</option>
            <option value='debit'>Debit</option>
          </select>
        </label>
        <label name='description'>
          Description:
          <input
            name='description'
            onChange={handleChange}
            type='text'
            value={formValues.description || ''}
          />
        </label>
        <button onClick={handleSubmit} type='submit'>Add</button>
      </form>
    </div>
  )
}

const Transactions = () => {
  return (
    <>
      <h1>We will put transactions here</h1>
      <TransactionForm />
    </>
  )
}

export default Transactions

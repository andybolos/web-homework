import * as React from 'react'
import Piechart from 'react-minimal-pie-chart'
export const TransactionsChart = (transactions) => {
  const bakePie = () => {
    const pie = []
    const creditSlice = {
      title: 'Credit',
      value: transactions.transactions.filter(transaction => transaction.credit).length,
      color: '#DB4939'
    }
    const debitSlice = {
      title: 'Debit',
      value: transactions.transactions.filter(transaction => transaction.debit).length,
      color: '#0ADB92'
    }
    pie.push(creditSlice, debitSlice)
    return pie
  }

  return (
    <>
      <Piechart
        data={bakePie()}
        label={({ data, dataIndex }) =>
          Math.round(data[dataIndex].percentage) + '%'
        }
        labelStyle={{
          fontSize: '5px',
          fill: '#000000'
        }}
      />
    </>
  )
}

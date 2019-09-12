import * as React from 'react'
import Piechart from 'react-minimal-pie-chart'
import { css } from '@emotion/core'

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
      <div css={LegendStyle}>
        <div>
          <h4>Credit<span className='LegendColor--credit' /></h4>
          <h4>Debit<span className='LegendColor--debit' /></h4>
        </div>
      </div>
      <Piechart
        data={bakePie()}
        label={({ data, dataIndex }) =>
          Math.round(data[dataIndex].percentage) + '%'
        }
        labelStyle={{
          fontSize: '5px',
          fill: '#000000'
        }}
        style={{ height: '300px' }}
      />
    </>
  )
}

const LegendStyle = css`
  margin-top: 56px;
  margin-bottom: 24px;

  & div:last-child {
    display: flex;
  }

  & h4 {
    display: inline;
    margin: 0;
  }

  & span {
    height: 15px;
    width: 15px;
    display: inline-block;
    margin-left: 8px;
    margin-right: 16px;
    border-radius: 50px;
  }

  & span.LegendColor--credit {
    background: #DB4939;
  }

  & span.LegendColor--debit {
    background: #0ADB92;
  }
`

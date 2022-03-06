import React from 'react'
import { formatCurrency } from '../helpers/currency'

function BudgetPrice({ amount, max }) {
  return (
    <div>
      <span>{formatCurrency(amount)}</span>
      {max && (
        <>
          <span className="mx-1">/</span>
          <small className="text-muted">{formatCurrency(max)}</small>
        </>
      )}
    </div>
  )
}

export default BudgetPrice

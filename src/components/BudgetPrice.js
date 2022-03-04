import React from 'react'

function BudgetPrice({ amount, max }) {
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div>
      <span>{priceFormatter.format(amount)}</span>
      {max && (
        <>
          <span className="mx-1">/</span>
          <small className="text-muted">{priceFormatter.format(max)}</small>
        </>
      )}
    </div>
  )
}

export default BudgetPrice

import React from 'react'
import { Button, Stack } from 'react-bootstrap'

function ExpenseItem({ expense, onRemove }) {
  const handleRemove = () => onRemove(expense)

  return (
    <Stack direction="horizontal" gap={2}>
      <p>{expense.description}</p>
      <Stack className="ms-auto" direction="horizontal" gap={2}>
        <span>{expense.amount}</span>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleRemove}
          data-testid="remove-expense"
        >
          &times;
        </Button>
      </Stack>
    </Stack>
  )
}

export default ExpenseItem

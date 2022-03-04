import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import BudgetPrice from './BudgetPrice'

function BudgetCard({
  title,
  amount,
  max,
  onAddExpense,
  onViewExpense,
  isGray,
  isActionHidden = false,
  isPrograssBarHidden = false,
}) {
  let cardClassNames = isGray
    ? 'bg-light'
    : amount > max
    ? 'bg-danger bg-opacity-10'
    : null

  const progressBarColor =
    amount / max < 0.5 ? 'primary' : amount / max < 0.75 ? 'warning' : 'danger'

  return (
    <Card className={cardClassNames}>
      <Card.Body>
        <Stack direction="horizontal">
          <Card.Title className="me-auto">{title}</Card.Title>
          <BudgetPrice amount={amount} max={max} />
        </Stack>
        {!isPrograssBarHidden && (
          <ProgressBar
            className="my-3"
            max={max}
            now={amount}
            variant={progressBarColor}
          />
        )}
        {!isActionHidden && (
          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpense}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpense}>
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

export default BudgetCard

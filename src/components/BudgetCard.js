import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import BudgetPrice from './BudgetPrice'

function BudgetCard({
  budget,
  onAddExpense,
  onViewExpense,
  isGray,
  isActionHidden = false,
  isPrograssBarHidden = false,
  onRemove,
}) {
  const { amount, maximumSpending, name } = budget

  let cardClassNames = isGray
    ? 'bg-light'
    : amount > maximumSpending
    ? 'bg-danger bg-opacity-10'
    : null

  const progressBarColor =
    amount / maximumSpending < 0.5
      ? 'primary'
      : amount / maximumSpending < 0.75
      ? 'warning'
      : 'danger'

  const handleRemoveBudget = () => onRemove(budget)

  return (
    <Card className={cardClassNames} data-testid="budget-card">
      {!isActionHidden && (
        <Button
          size="sm"
          variant="danger"
          className="position-absolute top-0 end-0"
          style={{ margin: '-0.5rem' }}
          onClick={handleRemoveBudget}
          data-testid="remove-budget"
        >
          &times;
        </Button>
      )}
      <Card.Body>
        <Stack direction="horizontal">
          <Card.Title className="me-auto">{name}</Card.Title>
          <BudgetPrice amount={amount} max={maximumSpending} />
        </Stack>
        {!isPrograssBarHidden && (
          <ProgressBar
            data-testid="budget-progress"
            className="my-3"
            max={maximumSpending}
            now={amount}
            variant={progressBarColor}
          />
        )}
        {!isActionHidden && (
          <Stack direction="horizontal" gap={2} data-testid="card-action">
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

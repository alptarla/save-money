import { Button, Stack } from 'react-bootstrap'

function Header({ title, onAddBudget, onAddExpense }) {
  return (
    <Stack direction="horizontal" gap={5} className="my-3">
      <h1>{title}</h1>
      <Stack direction="horizontal" gap={2} className="ms-auto">
        <Button variant="primary" onClick={onAddBudget}>
          Add Budget
        </Button>
        <Button variant="outline-primary" onClick={onAddExpense}>
          Add Expense
        </Button>
      </Stack>
    </Stack>
  )
}

export default Header

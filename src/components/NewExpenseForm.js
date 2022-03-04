import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useBudget } from '../context/BudgetContext'

function NewExpenseForm({ onSubmit, budget: defaultBudget }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [budget, setBudget] = useState(defaultBudget?.name || 'Uncategorized')

  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const handleAmountChange = (e) => setAmount(e.target.value)
  const handleBudgetChange = (e) => setBudget(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      description,
      amount,
      budget,
    })
  }

  const { budgets } = useBudget()

  const isThereUncategorized = budgets.some((budget) => {
    return budget.name === 'Uncategorized'
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="expense">Description</Form.Label>
        <Form.Control
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="amount">Amount</Form.Label>
        <Form.Control
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="budget">Budget</Form.Label>
        <Form.Select
          defaultValue={defaultBudget?.name || 'Uncategorized'}
          id="budget"
          onChange={handleBudgetChange}
        >
          {!isThereUncategorized && (
            <option value="Uncategorized">Uncategorized</option>
          )}
          {budgets.map((budget) => (
            <option key={budget.id} value={budget.name}>
              {budget.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="d-flex">
        <Button size="sm" className="ms-auto" type="submit">
          Add
        </Button>
      </div>
    </Form>
  )
}

export default NewExpenseForm

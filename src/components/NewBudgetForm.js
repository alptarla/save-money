import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function NewBudgetForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [maximumSpending, setMaximumSpending] = useState('')

  const handleNameChange = (e) => setName(e.target.value)
  const handleMaximumSpendingChange = (e) => setMaximumSpending(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, maximumSpending })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="maximum-spending">Maximum Spending</Form.Label>
        <Form.Control
          type="number"
          id="maximum-spending"
          value={maximumSpending}
          onChange={handleMaximumSpendingChange}
          required
          min={100}
        />
      </Form.Group>
      <div className="d-flex">
        <Button type="submit" size="sm" className="ms-auto">
          Add
        </Button>
      </div>
    </Form>
  )
}

export default NewBudgetForm

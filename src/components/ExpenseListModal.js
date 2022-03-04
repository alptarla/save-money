import React from 'react'
import { ListGroup, Modal } from 'react-bootstrap'
import ExpenseItem from './ExpenseItem'

function ExpenseListModal({ show, onHide, budget, onRemoveExpense }) {
  const handleRemoveExpense = (expense) =>
    onRemoveExpense({ expenseId: expense.id, budgetId: budget.id })

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Expenses - {budget?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {budget?.expenses?.map((expense) => (
            <ListGroup.Item key={expense.id}>
              <ExpenseItem expense={expense} onRemove={handleRemoveExpense} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseListModal

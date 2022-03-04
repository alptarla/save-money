import React from 'react'
import { Modal } from 'react-bootstrap'
import NewExpenseForm from './NewExpenseForm'

function ExpenseModal({ show, onHide, onAdd, defaultBudget }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>New Expense</Modal.Header>
      <Modal.Body>
        <NewExpenseForm onSubmit={onAdd} defaultBudget={defaultBudget} />
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseModal

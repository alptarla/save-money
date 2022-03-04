import React from 'react'
import { Modal } from 'react-bootstrap'
import NewExpenseForm from './NewExpenseForm'

function ExpenseModal({ show, onHide, onAdd, budget }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewExpenseForm onSubmit={onAdd} budget={budget} />
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseModal

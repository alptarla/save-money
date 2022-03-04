import React from 'react'
import { Modal } from 'react-bootstrap'
import NewExpenseForm from './NewExpenseForm'

function ExpenseModal({ show, onHide, onAdd }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>New Expense</Modal.Header>
      <Modal.Body>
        <NewExpenseForm onSubmit={onAdd} />
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseModal

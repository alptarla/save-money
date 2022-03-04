import React from 'react'
import { Modal } from 'react-bootstrap'
import NewBudgetForm from './NewBudgetForm'

function BudgetModal({ show, onHide, onAdd }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewBudgetForm onSubmit={onAdd} />
      </Modal.Body>
    </Modal>
  )
}

export default BudgetModal

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import BudgetModal from './components/BudgetModal'
import Header from './components/Header'

function App() {
  const [isShowBudgetModal, setIsShowBudgetModal] = useState(false)
  const [isShowExpenseModal, setIsShowExpenseModal] = useState(false)

  const showBudgetModal = (isShow) => () => setIsShowBudgetModal(isShow)
  const showExpanseModal = (isShow) => () => setIsShowExpenseModal(isShow)

  const addBudget = (newBudget) => {
    console.log('newBudget', newBudget)
  }

  return (
    <>
      <Container>
        <Header
          title="Budget"
          onAddBudget={showBudgetModal(true)}
          onAddExpense={showExpanseModal(true)}
        />
        <main>
          <BudgetCard amount={125} max={200} title="Shopping" />
        </main>
      </Container>

      {/* modals */}
      <BudgetModal
        show={isShowBudgetModal}
        onHide={showBudgetModal(false)}
        onAdd={addBudget}
      />
    </>
  )
}

export default App

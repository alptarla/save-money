import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import BudgetModal from './components/BudgetModal'
import Header from './components/Header'
import { useBudget } from './context/BudgetContext'

function App() {
  const [isShowBudgetModal, setIsShowBudgetModal] = useState(false)
  const [isShowExpenseModal, setIsShowExpenseModal] = useState(false)

  const showBudgetModal = (isShow) => () => setIsShowBudgetModal(isShow)
  const showExpanseModal = (isShow) => () => setIsShowExpenseModal(isShow)

  const { addBudget, budgets, getBudgets } = useBudget()

  useEffect(() => {
    getBudgets()
  }, [])

  const handleAddBudget = (newBudget) => {
    addBudget({
      id: nanoid(),
      ...newBudget,
    })

    setIsShowBudgetModal(false)
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
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              max={budget.maximumSpending}
              amount={100}
              title={budget.name}
            />
          ))}
        </main>
      </Container>

      {/* modals */}
      <BudgetModal
        show={isShowBudgetModal}
        onHide={showBudgetModal(false)}
        onAdd={handleAddBudget}
      />
    </>
  )
}

export default App

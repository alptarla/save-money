import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import BudgetModal from './components/BudgetModal'
import ExpenseModal from './components/ExpenseModal'
import Header from './components/Header'
import { useBudget } from './context/BudgetContext'

function App() {
  const [isShowBudgetModal, setIsShowBudgetModal] = useState(false)
  const [isShowExpenseModal, setIsShowExpenseModal] = useState(false)

  const showBudgetModal = (isShow) => () => setIsShowBudgetModal(isShow)
  const showExpanseModal = (isShow) => () => setIsShowExpenseModal(isShow)

  const { addBudget, budgets, getBudgets, updateBudget } = useBudget()

  useEffect(() => {
    getBudgets()
  }, [])

  const handleAddBudget = (newBudget) => {
    addBudget({
      id: nanoid(),
      expenses: [],
      ...newBudget,
    })

    setIsShowBudgetModal(false)
  }

  const createUncategorizedBudget = (expense = {}) => {
    addBudget({
      id: nanoid(),
      name: 'Uncategorized',
      maximumSpending: null,
      expenses: [
        {
          id: nanoid(),
          ...expense,
        },
      ],
    })
  }

  const findBudgetByName = (name) => {
    return budgets.find((budget) => budget.name === name)
  }

  const handleAddExpense = (newExpense) => {
    let existingBudget = findBudgetByName(newExpense.budget)

    if (!existingBudget && newExpense.budget === 'Uncategorized') {
      createUncategorizedBudget(newExpense)
      setIsShowExpenseModal(false)

      return
    }

    existingBudget.expenses.push({
      id: nanoid(),
      ...newExpense,
    })

    updateBudget(existingBudget)
    setIsShowExpenseModal(false)
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
      <ExpenseModal
        show={isShowExpenseModal}
        onHide={showExpanseModal(false)}
        onAdd={handleAddExpense}
      />
    </>
  )
}

export default App

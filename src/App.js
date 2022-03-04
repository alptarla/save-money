import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import BudgetModal from './components/BudgetModal'
import ExpenseListModal from './components/ExpenseListModal'
import ExpenseModal from './components/ExpenseModal'
import Header from './components/Header'
import { useBudget } from './context/BudgetContext'

function App() {
  const [isShowBudgetModal, setIsShowBudgetModal] = useState(false)
  const [isShowExpenseModal, setIsShowExpenseModal] = useState(false)
  const [isShowExpenseViewModal, setIsShowExpenseViewModal] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState(null)

  const showBudgetModal = (isShow) => () => setIsShowBudgetModal(isShow)
  const showExpenseModal = (isShow, budget) => () => {
    setIsShowExpenseModal(isShow)
    setSelectedBudget(budget)
  }
  const showExpenseViewModal = (isShow, budget) => () => {
    setIsShowExpenseViewModal(isShow)
    setSelectedBudget(budget)
  }

  const { addBudget, budgets, getBudgets, updateBudget } = useBudget()

  useEffect(() => {
    getBudgets()
  }, [])

  const totalAmount = budgets.reduce((acc, curr) => acc + curr.amount, 0)
  const totalSpending = budgets.reduce((acc, curr) => {
    return acc + parseInt(curr.maximumSpending || 0)
  }, 0)

  const handleAddBudget = (newBudget) => {
    addBudget({
      id: nanoid(),
      expenses: [],
      amount: 0,
      ...newBudget,
    })

    setIsShowBudgetModal(false)
  }

  const createUncategorizedBudget = (expense = {}) => {
    addBudget({
      id: nanoid(),
      name: 'Uncategorized',
      maximumSpending: null,
      amount: parseInt(expense.amount),
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

    existingBudget.amount += parseInt(newExpense.amount)

    updateBudget(existingBudget)
    setIsShowExpenseModal(false)
  }

  const removeExpense = ({ expenseId, budgetId }) => {
    const budget = budgets.find((budget) => budget.id === budgetId)
    if (!budget) return

    budget.expenses = budget.expenses.filter((expense) => {
      return expense.id !== expenseId
    })

    updateBudget(budget)

    if (budgetId === selectedBudget.id) {
      setSelectedBudget(budget)
    }

    if (!selectedBudget.expenses.length) {
      setIsShowExpenseViewModal(false)
    }
  }

  return (
    <>
      <Container>
        <Header
          title="Budget"
          onAddBudget={showBudgetModal(true)}
          onAddExpense={showExpenseModal(true)}
        />
        <main className="my-5">
          <Stack direction="vertical" gap={5}>
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                max={budget.maximumSpending}
                amount={budget.amount}
                title={budget.name}
                isGray={budget.name === 'Uncategorized'}
                isPrograssBarHidden={budget.name === 'Uncategorized'}
                onAddExpense={showExpenseModal(true, budget)}
                onViewExpense={showExpenseViewModal(true, budget)}
              />
            ))}
            <BudgetCard
              max={totalSpending}
              amount={totalAmount}
              title="Total"
              isGray
              isActionHidden
            />
          </Stack>
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
        onHide={showExpenseModal(false)}
        onAdd={handleAddExpense}
        budget={selectedBudget}
      />
      <ExpenseListModal
        show={isShowExpenseViewModal}
        onHide={showExpenseViewModal(false)}
        budget={findBudgetByName(selectedBudget?.name)}
        onRemoveExpense={removeExpense}
      />
    </>
  )
}

export default App

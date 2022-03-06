import { fireEvent, render, screen } from '@testing-library/react'
import ExpenseModal from '../../components/ExpenseModal'
import BudgetProvider from '../../context/BudgetContext'
import { testBudget } from './BudgetCard.spec'

describe('<ExpenseModal />', () => {
  const onHideFn = jest.fn()

  test('renders correctly', () => {
    render(
      <BudgetProvider>
        <ExpenseModal show={true} onHide={onHideFn} budget={testBudget} />
      </BudgetProvider>
    )

    expect(screen.getByText(/new expense/i)).toBeInTheDocument()
  })

  test('should be call onHide correctly', () => {
    render(
      <BudgetProvider>
        <ExpenseModal show={true} onHide={onHideFn} budget={testBudget} />
      </BudgetProvider>
    )

    const closeButton = screen.getByLabelText(/close/i)
    fireEvent.click(closeButton)

    expect(onHideFn).toBeCalled()
  })
})

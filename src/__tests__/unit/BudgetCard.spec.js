import { fireEvent, render, screen } from '@testing-library/react'
import BudgetCard from '../../components/BudgetCard'

describe('< BudgetCard />', () => {
  const testBudget = {
    id: 'test-id',
    name: 'test-budget',
    maximumSpending: 100,
    amount: 0,
    expenses: [],
  }

  const mockOnAddExpense = jest.fn()
  const mockOnViewExpense = jest.fn()
  const mockOnRemove = jest.fn()

  test('should be trigger modals', () => {
    render(
      <BudgetCard
        budget={testBudget}
        onAddExpense={mockOnAddExpense}
        onViewExpense={mockOnViewExpense}
      />
    )

    const addExpenseBtn = screen.getByRole('button', { name: /add expense/i })
    const viewExpenseBtn = screen.getByRole('button', { name: /view expense/i })

    fireEvent.click(addExpenseBtn)
    expect(mockOnAddExpense).toBeCalled()

    fireEvent.click(viewExpenseBtn)
    expect(mockOnViewExpense).toBeCalled()
  })

  test('should be call onRemove function with this budget', () => {
    render(<BudgetCard budget={testBudget} onRemove={mockOnRemove} />)

    const removeBtn = screen.getByTestId(/remove-budget/i)
    fireEvent.click(removeBtn)

    expect(mockOnRemove).toBeCalledWith(testBudget)
  })

  test('should be hidden the action buttons in card', () => {
    render(<BudgetCard budget={testBudget} isActionHidden />)

    const cardAction = screen.queryByTestId(/card-action/i)
    const removeBtn = screen.queryByTestId(/remove-budget/i)

    expect(cardAction).toBeNull()
    expect(removeBtn).toBeNull()
  })

  test('should be hidden the progress bar', () => {
    render(<BudgetCard budget={testBudget} isPrograssBarHidden />)

    const progressBar = screen.queryByTestId(/budget-progress/)
    expect(progressBar).toBeNull()
  })

  test('should be have gray background', () => {
    render(<BudgetCard budget={testBudget} isGray />)

    const card = screen.getByTestId('budget-card')
    expect(card.classList.contains('bg-light')).toBeTruthy()
  })
})

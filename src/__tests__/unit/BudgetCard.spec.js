import { fireEvent, render, screen } from '@testing-library/react'
import BudgetCard from '../../components/BudgetCard'

export const testBudget = {
  id: 'test-id',
  name: 'test-budget',
  maximumSpending: 100,
  amount: 0,
  expenses: [],
}

const onAddExpenseFn = jest.fn()
const onViewExpenseFn = jest.fn()
const onRemoveFn = jest.fn()

function renderBudgetCard(props) {
  const utils = render(
    <BudgetCard
      {...props}
      budget={testBudget}
      onAddExpense={onAddExpenseFn}
      onViewExpense={onViewExpenseFn}
      onRemove={onRemoveFn}
    />
  )

  return { ...utils, props }
}

describe('<BudgetCard />', () => {
  test('should be trigger modals', () => {
    renderBudgetCard()

    const addExpenseBtn = screen.getByRole('button', { name: /add expense/i })
    const viewExpenseBtn = screen.getByRole('button', { name: /view expense/i })

    fireEvent.click(addExpenseBtn)
    expect(onAddExpenseFn).toBeCalled()

    fireEvent.click(viewExpenseBtn)
    expect(onViewExpenseFn).toBeCalled()
  })

  test('should be call onRemove function with this budget', () => {
    renderBudgetCard()

    const removeBtn = screen.getByTestId(/remove-budget/i)
    fireEvent.click(removeBtn)

    expect(onRemoveFn).toBeCalledWith(testBudget)
  })

  test('should be hidden the action buttons in card', () => {
    renderBudgetCard({ isActionHidden: true })

    const cardAction = screen.queryByTestId(/card-action/i)
    const removeBtn = screen.queryByTestId(/remove-budget/i)

    expect(cardAction).toBeNull()
    expect(removeBtn).toBeNull()
  })

  test('should be hidden the progress bar', () => {
    renderBudgetCard({ isPrograssBarHidden: true })

    const progressBar = screen.queryByTestId(/budget-progress/)
    expect(progressBar).toBeNull()
  })

  test('should be have gray background', () => {
    render(<BudgetCard budget={testBudget} isGray />)

    const card = screen.getByTestId('budget-card')
    expect(card.classList.contains('bg-light')).toBeTruthy()
  })
})

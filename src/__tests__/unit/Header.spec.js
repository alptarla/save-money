import { fireEvent, render, screen } from '@testing-library/react'
import Header from '../../components/Header'

describe('<Header />', () => {
  test('renders correctly', () => {
    render(<Header title="Budget" />)
    expect(screen.getByRole('heading', { name: /budget/i })).toBeInTheDocument()
  })

  test('should be call action buttons correctly', () => {
    const onAddBudgetFn = jest.fn()
    const onAddExpenseFn = jest.fn()

    render(
      <Header
        title="Budget"
        onAddBudget={onAddBudgetFn}
        onAddExpense={onAddExpenseFn}
      />
    )

    const addBudget = screen.getByRole('button', { name: /add budget/i })
    fireEvent.click(addBudget)

    const addExpense = screen.getByRole('button', { name: /add expense/i })
    fireEvent.click(addExpense)

    expect(onAddBudgetFn).toBeCalled()
    expect(onAddExpenseFn).toBeCalled()
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import ExpenseItem from '../../components/ExpenseItem'

describe('<ExpenseItem />', () => {
  const testExpense = {
    id: 'test-id',
    description: 'test-description',
    amount: 0,
    budget: 'test-budget',
  }
  const onRemoveFn = jest.fn()

  test('renders correctly', () => {
    render(<ExpenseItem expense={testExpense} onRemove={onRemoveFn} />)

    expect(screen.getByText(testExpense.description)).toBeInTheDocument()
    expect(screen.getByText(testExpense.amount)).toBeInTheDocument()
  })

  test('should be call remove fn with this expense', () => {
    render(<ExpenseItem expense={testExpense} onRemove={onRemoveFn} />)

    const removeButton = screen.getByTestId('remove-expense')
    fireEvent.click(removeButton)

    expect(onRemoveFn).toBeCalledWith(testExpense)
  })
})

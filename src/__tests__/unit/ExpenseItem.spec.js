import { fireEvent, render, screen } from '@testing-library/react'
import ExpenseItem from '../../components/ExpenseItem'

export const testExpense = {
  id: 'test-id',
  description: 'test-description',
  amount: 0,
  budget: 'test-budget',
}
const onRemoveFn = jest.fn()

function renderExpenseItem(props) {
  return render(
    <ExpenseItem expense={testExpense} onRemove={onRemoveFn} {...props} />
  )
}

describe('<ExpenseItem />', () => {
  test('renders correctly', () => {
    renderExpenseItem()

    expect(screen.getByText(testExpense.description)).toBeInTheDocument()
    expect(screen.getByText(testExpense.amount)).toBeInTheDocument()
  })

  test('should be call remove fn with this expense', () => {
    renderExpenseItem()

    const removeButton = screen.getByTestId('remove-expense')
    fireEvent.click(removeButton)

    expect(onRemoveFn).toBeCalledWith(testExpense)
  })
})

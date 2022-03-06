import { fireEvent, render, screen } from '@testing-library/react'
import ExpenseModal from '../../components/ExpenseModal'
import BudgetProvider from '../../context/BudgetContext'
import { testBudget } from './BudgetCard.spec'

const onHideFn = jest.fn()

function renderExpenseModal(props) {
  return render(
    <BudgetProvider>
      <ExpenseModal
        {...props}
        show={true}
        onHide={onHideFn}
        budget={testBudget}
      />
    </BudgetProvider>
  )
}

describe('<ExpenseModal />', () => {
  test('renders correctly', () => {
    renderExpenseModal()
    expect(screen.getByText(/new expense/i)).toBeInTheDocument()
  })

  test('should be call onHide correctly', () => {
    renderExpenseModal()

    const closeButton = screen.getByLabelText(/close/i)
    fireEvent.click(closeButton)

    expect(onHideFn).toBeCalled()
  })
})

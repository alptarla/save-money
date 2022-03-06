import { fireEvent, render, screen } from '@testing-library/react'
import ExpenseListModal from '../../components/ExpenseListModal'
import { testBudget } from './BudgetCard.spec'

const onHideFn = jest.fn()

function renderExpenseListModal(props) {
  return render(
    <ExpenseListModal
      {...props}
      show={true}
      budget={testBudget}
      onHide={onHideFn}
    />
  )
}

describe('<ExpenseListModal />', () => {
  test('renders correctly', () => {
    renderExpenseListModal()
    expect(screen.getByText(/expenses - /i)).toBeInTheDocument()
  })

  test('should be call onHide correctly', () => {
    renderExpenseListModal()

    const closeButton = screen.getByLabelText(/close/i)
    fireEvent.click(closeButton)

    expect(onHideFn).toBeCalled()
  })
})

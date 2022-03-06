import { fireEvent, render, screen } from '@testing-library/react'
import ExpenseListModal from '../../components/ExpenseListModal'
import { testBudget } from './BudgetCard.spec'

describe('<ExpenseListModal />', () => {
  test('renders correctly', () => {
    render(<ExpenseListModal show={true} budget={testBudget} />)
    expect(screen.getByText(/expenses - /i)).toBeInTheDocument()
  })

  test('should be call onHide correctly', () => {
    const onHideFn = jest.fn()
    render(
      <ExpenseListModal show={true} budget={testBudget} onHide={onHideFn} />
    )

    const closeButton = screen.getByLabelText(/close/i)
    fireEvent.click(closeButton)

    expect(onHideFn).toBeCalled()
  })
})

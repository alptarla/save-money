import { fireEvent, render, screen } from '@testing-library/react'
import BudgetModal from '../../components/BudgetModal'

describe('<BudgetModal />', () => {
  test('renders correctly', () => {
    render(<BudgetModal show={true} />)
    expect(screen.getByText(/new budget/i)).toBeInTheDocument()
  })

  test('should be call the onHide func', () => {
    const onHideFn = jest.fn()
    render(<BudgetModal show={true} onHide={onHideFn} />)

    const closeBtn = screen.getByLabelText(/close/i)
    fireEvent.click(closeBtn)

    expect(onHideFn).toBeCalled()
  })
})

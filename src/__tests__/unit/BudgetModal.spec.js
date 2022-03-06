import { fireEvent, render, screen } from '@testing-library/react'
import BudgetModal from '../../components/BudgetModal'

const onHideFn = jest.fn()

function renderBudgetModal(props) {
  return render(<BudgetModal show={true} onHide={onHideFn} {...props} />)
}

describe('<BudgetModal />', () => {
  test('renders correctly', () => {
    renderBudgetModal()
    expect(screen.getByText(/new budget/i)).toBeInTheDocument()
  })

  test('should be call the onHide func', () => {
    renderBudgetModal()

    const closeBtn = screen.getByLabelText(/close/i)
    fireEvent.click(closeBtn)

    expect(onHideFn).toBeCalled()
  })
})

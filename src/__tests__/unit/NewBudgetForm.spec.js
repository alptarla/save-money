import { fireEvent, render, screen } from '@testing-library/react'
import NewBudgetForm from '../../components/NewBudgetForm'

const onSubmitFn = jest.fn()

function renderNewBudgetForm(props) {
  return render(<NewBudgetForm {...props} onSubmit={onSubmitFn} />)
}

describe('<NewBudgetForm />', () => {
  const submitData = {
    name: 'test-name',
    maximumSpending: '10',
  }

  test('renders correctly', () => {
    renderNewBudgetForm()

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/maximum spending/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  test('should be call onSumbit function correctly', () => {
    renderNewBudgetForm()

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: submitData.name },
    })
    fireEvent.change(screen.getByLabelText(/maximum spending/i), {
      target: { value: parseInt(submitData.maximumSpending) },
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(onSubmitFn).toBeCalledWith(submitData)
  })
})

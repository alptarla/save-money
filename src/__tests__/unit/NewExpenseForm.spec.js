import { fireEvent, render, screen } from '@testing-library/react'
import NewExpenseForm from '../../components/NewExpenseForm'
import BudgetProvider from '../../context/BudgetContext'
import { testBudget } from './BudgetCard.spec'

const onSubmitFn = jest.fn()

function renderNewExpenseForm(props) {
  return render(
    <BudgetProvider>
      <NewExpenseForm {...props} onSubmit={onSubmitFn} />
    </BudgetProvider>
  )
}

describe('<NewExpenseForm />', () => {
  const submitData = {
    description: 'test-description',
    amount: '10',
    budget: 'Uncategorized',
  }

  test('renders correctly', () => {
    renderNewExpenseForm()

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/budget/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  test('should be default select Uncategorized budget, if not pass to budget props', () => {
    renderNewExpenseForm()

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: submitData.description },
    })
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: parseInt(submitData.amount) },
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(onSubmitFn).toBeCalledWith(submitData)
  })

  test('should be call onSubmit function correctly', () => {
    renderNewExpenseForm({ budget: testBudget })

    const data = { ...submitData, budget: testBudget.name }

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: data.description },
    })
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: parseInt(data.amount) },
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(onSubmitFn).toBeCalledWith(data)
  })
})

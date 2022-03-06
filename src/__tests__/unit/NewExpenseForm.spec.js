import { fireEvent, render, screen } from '@testing-library/react'
import NewExpenseForm from '../../components/NewExpenseForm'
import BudgetProvider from '../../context/BudgetContext'
import { testBudget } from './BudgetCard.spec'

describe('<NewExpenseForm />', () => {
  const onSubmitFn = jest.fn()

  test('renders correctly', () => {
    render(
      <BudgetProvider>
        <NewExpenseForm onSubmit={onSubmitFn} budget={testBudget} />
      </BudgetProvider>
    )

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/budget/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  test('should be default select Uncategorized budget, if not pass to budget props', () => {
    render(
      <BudgetProvider>
        <NewExpenseForm onSubmit={onSubmitFn} />
      </BudgetProvider>
    )

    const submitData = {
      description: 'test-description',
      amount: '10',
      budget: 'Uncategorized',
    }

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
    render(
      <BudgetProvider>
        <NewExpenseForm onSubmit={onSubmitFn} budget={testBudget} />
      </BudgetProvider>
    )

    const submitData = {
      description: 'test-description',
      amount: '10',
      budget: testBudget.name,
    }

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: submitData.description },
    })
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: parseInt(submitData.amount) },
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(onSubmitFn).toBeCalledWith(submitData)
  })
})

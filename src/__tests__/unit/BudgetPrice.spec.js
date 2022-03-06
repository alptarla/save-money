import { render, screen } from '@testing-library/react'
import BudgetPrice from '../../components/BudgetPrice'
import { formatCurrency } from '../../helpers/currency'

describe('<BudgetPrice />', () => {
  test('renders correctly', () => {
    render(<BudgetPrice amount={0} max={100} />)

    const amount = formatCurrency(0)
    const max = formatCurrency(100)

    expect(screen.getByText(amount)).toBeInTheDocument()
    expect(screen.getByText(max)).toBeInTheDocument()
  })
})

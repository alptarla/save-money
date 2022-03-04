import { Container } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import Header from './components/Header'

function App() {
  return (
    <Container>
      <Header title="Budget" />
      <main>
        <BudgetCard amount={125} max={200} title="Shopping" />
      </main>
    </Container>
  )
}

export default App

import React, { createContext, useContext, useReducer } from 'react'

const BudgetContext = createContext(null)
export const useBudget = () => useContext(BudgetContext)

const initialState = {
  budgets: [],
}

function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      }
    default:
      return state
  }
}

function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const addBudget = (newBudget) => {
    dispatch({ type: 'SET_BUDGET', payload: newBudget })
  }

  return (
    <BudgetContext.Provider value={{ ...state, addBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider

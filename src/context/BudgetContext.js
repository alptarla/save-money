import React, { createContext, useContext, useReducer } from 'react'
import StorageService from '../services/StorageService'

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
    case 'SET_BUDGETS':
      return {
        ...state,
        budgets: action.payload,
      }
    default:
      return state
  }
}

function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const addBudget = (newBudget) => {
    dispatch({ type: 'SET_BUDGET', payload: newBudget })
    StorageService.set('budget', [...state.budgets, newBudget])
  }

  const getBudgets = () => {
    const budgets = StorageService.get('budget') || []
    dispatch({ type: 'SET_BUDGETS', payload: budgets })
  }

  return (
    <BudgetContext.Provider value={{ ...state, addBudget, getBudgets }}>
      {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider

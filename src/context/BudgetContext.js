import React, { createContext, useContext, useEffect, useReducer } from 'react'
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
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map((budget) => {
          return budget.id === action.payload.id ? action.payload : budget
        }),
      }
    default:
      return state
  }
}

function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  useEffect(() => {
    StorageService.set('budget', state.budgets)
  }, [state])

  const addBudget = (newBudget) => {
    dispatch({ type: 'SET_BUDGET', payload: newBudget })
    StorageService.set('budget', [...state.budgets, newBudget])
  }

  const getBudgets = () => {
    const budgets = StorageService.get('budget') || []
    dispatch({ type: 'SET_BUDGETS', payload: budgets })
  }

  const updateBudget = (newBudget) => {
    const budgetObj = { ...newBudget }
    budgetObj.amount = budgetObj.expenses.reduce((acc, curr) => {
      return acc + parseInt(curr.amount)
    }, 0)

    dispatch({ type: 'UPDATE_BUDGET', payload: budgetObj })
  }

  return (
    <BudgetContext.Provider
      value={{ ...state, addBudget, getBudgets, updateBudget }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider

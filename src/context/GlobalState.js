import React, { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';

const initialState = {
  transactions: [
    { id: 1, title: 'Flower', amount: 20, isExpense: true },
    { id: 2, title: 'Salary', amount: 300, isExpense: false },
    { id: 3, title: 'Book', amount: 10, isExpense: true },
    { id: 4, title: 'Camera', amount: 150, isExpense: false },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function calculateTotalIncome() {
    return state.transactions
      .filter(transaction => !transaction.isExpense)
      .reduce((acc, transaction) => (acc += transaction.amount), 0)
      .toFixed(2);
  }
  function calculateTotalExpense() {
    return state.transactions
      .filter(transaction => transaction.isExpense)
      .reduce((acc, transaction) => (acc += transaction.amount), 0)
      .toFixed(2);
  }

  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        calculateTotalIncome,
        calculateTotalExpense,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "toggle-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

export const budgerReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "add-budget":
      return {
        ...state,
        budget: action.payload.budget,
      };

    case "toggle-modal":
      return {
        ...state,
        modal: !state.modal,
      };

    case "add-expense": {
      return {
        ...state,
        modal: false, 
        expenses: [
          ...state.expenses,
          { id: uuidv4(), ...action.payload.expense },
        ],
      };
    }
    default:
      return state;
  }
};

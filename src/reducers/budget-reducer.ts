import { v4 as uuidv4 } from "uuid";
import { Categories, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "toggle-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { id: Expense["id"] } }
  | { type: "reset-app" }
  | { type: "set-current-categorie"; payload: { id: Categories["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editExpenseId: Expense["id"];
  currentCategorie: Categories["id"];
};

const initialExpenses = () => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses).expenses : [];
};

const initialBudget = () => {
  const budget = localStorage.getItem("expenses");
  return budget ? JSON.parse(budget).budget : 0;
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editExpenseId: "",
  currentCategorie: "",
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
        editExpenseId: "",
      };

    case "add-expense": {
      const update = state.editExpenseId
        ? state.expenses.map((item) =>
            item.id === state.editExpenseId
              ? { id: state.editExpenseId, ...action.payload.expense }
              : item
          )
        : [{ id: uuidv4(), ...action.payload.expense }, ...state.expenses];

      return {
        ...state,
        modal: false,
        expenses: update,
      };
    }

    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };

    case "update-expense":
      return {
        ...state,
        modal: !state.modal,
        editExpenseId: action.payload.id,
      };

    case "reset-app":
      return {
        ...initialState,
        expenses: [],
        budget: 0,
      };

    case "set-current-categorie":
      return {
        ...state,
        currentCategorie: action.payload.id,
      };

    default:
      return state;
  }
};

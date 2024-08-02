import { useReducer, createContext, useMemo } from "react";
import {
  budgerReducer,
  BudgetActions,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  restante: number;
  totalExpenses: number;
};

type BudgetProviderProps = {
  children: React.ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgerReducer, initialState);

  const totalExpenses: number = useMemo(
    () => state.expenses.reduce((acc, expense) => acc + expense.amount, 0),
    [state.expenses]
  );

  const restante = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, restante }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

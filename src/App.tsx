import { BudgetForm } from "./components/BudgetForm";
import { BudgetTracker } from "./components/BudgetTracker";
import { ExpenseList } from "./components/ExpenseList";
import ExpenseModal from "./components/ShowModal";
import { useBudget } from "./hooks/useBudget";
import { useMemo } from "react";

export const App = () => {
  const { state } = useBudget();

  const isValidState = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-center text-white font-black text-4xl">
          Planificador de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {!isValidState ? <BudgetForm /> : <BudgetTracker />}
      </div>

      {isValidState && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseModal />
          <ExpenseList />
        </main>
      )}
    </>
  );
};

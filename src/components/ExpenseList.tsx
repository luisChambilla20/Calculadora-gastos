import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {
  const { state } = useBudget();
  const inEmptyState = state.expenses.length === 0;

  return (
    <div className="mt-10 flex flex-col gap-5">
      <h2 className="text-center text-gray-600 text-3xl font-black">
        Lista de gastos
      </h2>

      {inEmptyState ? (
        <p className="text-center text-xl mt-5">No hay gastos registrados</p>
      ) : (
        <>
          {state.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

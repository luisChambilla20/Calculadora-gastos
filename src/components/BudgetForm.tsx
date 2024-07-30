import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPresupuesto(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget: presupuesto } });
  };

  const isValid = useMemo(
    () => isNaN(presupuesto) || presupuesto > 0,
    [presupuesto]
  );

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budged"
          className="text-center text-blue-600 font-bold text-4xl"
        >
          Definir presupuesto
        </label>
        <input
          id="budged"
          type="number"
          name="budged"
          className="w-full bg-white border border-gray-300 p-2 rounded-lg shadow-sm"
          placeholder="Define tu presupuesto ej. 300"
          value={presupuesto}
          onChange={handleChange}
          onClick={(e) => e.currentTarget.select()}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 text-white font-bold text-xl rounded-lg p-2 w-full cursor-pointer hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        value="Definir presupuesto"
        disabled={!isValid}
      />
    </form>
  );
};

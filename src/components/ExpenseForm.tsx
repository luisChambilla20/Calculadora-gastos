import { categories } from "../db/db";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { useBudget } from "../hooks/useBudget";
import { toast } from "react-toastify";

export const ExpenseForm = () => {
  const { state, dispatch, restante } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [previusAmount, setpreviusAmount] = useState(0);

  useEffect(() => {
    if (state.editExpenseId) {
      const idEdit = state.expenses.find(
        (item) => item.id === state.editExpenseId
      )!;

      setExpense(idEdit);
      setpreviusAmount(idEdit.amount);
    }
  }, [state.editExpenseId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberValue = ["amount"].includes(e.target.name);

    setExpense({
      ...expense,
      [e.target.name]: isNumberValue
        ? +e.target.value
        : e.target.value.toUpperCase(),
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    //EVIAR QUE NO SEA UNA CANTIDAD NEGATIVA
    if (expense.amount <= 0) {
      toast.error("La cantidad debe ser mayor a 0");
      return;
    }

    if (expense.amount - previusAmount > restante) {
      toast.error("La cantidad es mayor al presupuesto restante");
      return;
    }

    //PASO LAS VALIDACIONES
    dispatch({ type: "add-expense", payload: { expense } });
    setpreviusAmount(0);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editExpenseId ? "Editar Gasto" : "Agregar Gasto"}
      </legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del gasto"
          className="bg-slate-100 p-2 rounded-lg shadow-sm"
          name="expenseName"
          onChange={handleChange}
          value={expense.expenseName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          onSelect={(e) => e.currentTarget.select()}
          id="amount"
          placeholder="Añade la cantaidad del gasto: ej. 300"
          className="bg-slate-100 p-2 rounded-lg shadow-sm"
          name="amount"
          onChange={handleChange}
          value={expense.amount}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2 rounded-lg shadow-sm"
          name="category"
          onChange={handleChange}
          value={expense.category}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0 rounded-lg shadow-sm"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editExpenseId ? "Editar Gasto" : "Agregar Gasto"}
      />
    </form>
  );
};

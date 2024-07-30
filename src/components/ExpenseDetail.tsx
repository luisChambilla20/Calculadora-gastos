import { Categories, Expense } from "../types";
import { formatDate } from "../helpers/index";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../db/db";
import { useMemo } from "react";

type ExpenseDetailProps = {
  expense: Expense;
};

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const categorieFinded = useMemo(() => {
    return categories.find(
      (category: Categories) => category.id === expense.category
    );
  }, [expense]);

  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
      <div>
        <img
          className="w-20"
          src={`/img/icono_${categorieFinded?.icon}.svg`}
          alt="Icono de la categoría"
        />
      </div>
      <div>
        <p className="uppercase font-bold text-gray-400 text-sm">
          {categorieFinded?.name}
        </p>
        <p>{expense.expenseName}</p>
        <p className="text-slate-600 text-sm">
          {" "}
          {formatDate(expense.date!.toString())}{" "}
        </p>
      </div>
      <AmountDisplay amount={expense.amount} />
    </div>
  );
};

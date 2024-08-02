import { Categories, Expense } from "../types";
import { formatDate } from "../helpers/index";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../db/db";
import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const { dispatch } = useBudget();

  const categorieFinded = useMemo(() => {
    return categories.find(
      (category: Categories) => category.id === expense.category
    );
  }, [expense]);

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "update-expense", payload: { id: expense.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: expense.id } })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              className="w-20"
              src={`/img/icono_${categorieFinded?.icon}.svg`}
              alt="Icono de la categoría"
            />
          </div>
          <div className="flex-1">
            <p className="uppercase font-bold text-gray-400 text-sm">
              {categorieFinded?.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {" "}
              {formatDate(expense.date!.toString())}{" "}
            </p>
          </div>
          <div>
            <AmountDisplay amount={expense.amount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

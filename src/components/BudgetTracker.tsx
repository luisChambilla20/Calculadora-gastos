import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const BudgetTracker = () => {
  const { state, dispatch, restante, totalExpenses } = useBudget();

  const percentage = useMemo(
    () => +((totalExpenses / state.budget) * 100).toFixed(2),
    [state.expenses]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        {/* <img src="/img/grafico.jpg" alt="Grafico de control" /> */}
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            // Text size
            textSize: "16px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(255,0,0, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
        ;
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button
          type="button"
          className=" bg-red-500 font-bold uppercase rounded-lg text-white w-full py-2"
          onClick={() => dispatch({ type: "reset-app" })}
        >
          Reset APP
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Gastos" amount={totalExpenses} />
        <AmountDisplay label="Restante" amount={restante} />
      </div>
    </div>
  );
};

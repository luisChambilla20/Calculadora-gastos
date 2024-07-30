import { AmountDisplay } from "./AmountDisplay";

export const BudgetTracker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/img/grafico.jpg" alt="Grafico de control" />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button
          type="button"
          className=" bg-red-500 font-bold uppercase rounded-lg text-white w-full py-2"
        >
          Reset APP
        </button>

        <AmountDisplay label="Presupuesto inicial" amount={300} />
        <AmountDisplay label="Gastos" amount={200} />
        <AmountDisplay label="Restante" amount={100} />
      </div>
    </div>
  );
};

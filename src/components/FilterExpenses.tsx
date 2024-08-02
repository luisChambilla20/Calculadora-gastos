import { categories } from "../db/db";
import { useBudget } from "../hooks/useBudget";

export const FilterExpenses = () => {
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "set-current-categorie",
      payload: { id: e.target.value },
    });
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg mt-10 p-10 flex items-center justify-between gap-10">
      <p>Filtrar por categoria</p>

      <select
        name="categorieSelected"
        id="categorieSelected"
        className="bg-slate-100 p-2 rounded-lg shadow-sm flex-auto"
        onChange={handleChange}
      >
        <option value="">-- Seleccione Opcion --</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

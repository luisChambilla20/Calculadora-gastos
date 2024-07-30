export type Categories = {
  id: string;
  name: string;
  icon: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: Value;
  expenseName: string;
};

export type DraftExpense = Omit<Expense, "id">;

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

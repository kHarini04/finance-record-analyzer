import prisma from "../config/db.js";

export const getDashboardSummary = async () => {
  const records = await prisma.record.findMany();

  const income = records
    .filter(r => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const expense = records
    .filter(r => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
  };
};
import { getDashboardSummary } from "../services/analytics.service.js";

export const getSummary = async (req, res) => {
  const data = await getDashboardSummary();
  res.json(data);
};
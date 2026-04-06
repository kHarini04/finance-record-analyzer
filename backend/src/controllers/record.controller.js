import {
  createRecordService,
  getRecordsService,
  deleteRecordService,
} from "../services/record.service.js";

export const createRecord = async (req, res) => {
  const record = await createRecordService(req.body);
  res.json(record);
};

export const getRecords = async (req, res) => {
  const records = await getRecordsService();
  res.json(records);
};

export const deleteRecord = async (req, res) => {
  await deleteRecordService(req.params.id);
  res.json({ msg: "Deleted" });
};
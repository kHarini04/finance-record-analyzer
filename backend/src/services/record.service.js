import prisma from "../config/db.js";

export const createRecordService = async (data) => {
  return prisma.record.create({ data });
};

export const getRecordsService = async () => {
  return prisma.record.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const deleteRecordService = async (id) => {
  return prisma.record.delete({
    where: { id },
  });
};
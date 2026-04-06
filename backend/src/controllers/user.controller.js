import prisma from "../config/db.js";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const updateRole = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role: req.body.role }
  });

  res.json(user);
};

export const toggleStatus = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { isActive: req.body.isActive }
  });

  res.json(user);
};
import express from "express";
import { getUsers, updateRole, toggleStatus } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", protect, authorize(["ADMIN"]), getUsers);
router.patch("/:id/role", protect, authorize(["ADMIN"]), updateRole);
router.patch("/:id/status", protect, authorize(["ADMIN"]), toggleStatus);

export default router;
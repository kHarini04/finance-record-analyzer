import express from "express";
import { createRecord, getRecords, deleteRecord } from "../controllers/record.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorize(["ADMIN"]), createRecord);
router.get("/", protect, authorize(["ADMIN", "ANALYST", "VIEWER"]), getRecords);
router.delete("/:id", protect, authorize(["ADMIN"]), deleteRecord);

export default router;
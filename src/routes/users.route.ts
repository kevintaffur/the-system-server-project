import { Router } from "express";
import users from "../controllers/users.controller";

const router = Router();

router.get("/", users.get);
router.post("/", users.create);

export default router;

import { Router } from "express";
import roles from "../controllers/roles.controller";

const router = Router();

router.get("/", roles.get);
router.post("/", roles.create);

export default router;

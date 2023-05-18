import { Router } from "express";
import institutions from "../controllers/institutions.controller";

const router = Router();

router.get("/", institutions.get);

router.post("/", institutions.create);

export default router;

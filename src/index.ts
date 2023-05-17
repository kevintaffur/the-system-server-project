import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get("/", (_req, res) => {
  res.send("hey!");
});

app.post("/institutions", async (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  const institution = await prisma.institution.create({
    data: {
      name,
    },
  });
  res.json(institution);
});

app.get("/institutions", async (_req, res) => {
  const institutions = await prisma.institution.findMany({});
  res.json(institutions);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("hey!");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

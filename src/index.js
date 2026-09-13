const express = require("express");
const { serve } = require("inngest/express");

const { inngest } = require("./inngest/client");
const { sayHello, makeReport } = require("./inngest/functions");
const { reports } = require("./reports.js");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.post("/reports", async (req, res) => {
  const { topic } = req.body;

  const id = Date.now().toString();

  const report = {
    id,
    topic,
    status: "pending",
  };

  reports.set(id, report);

  await inngest.send({
    name: "report/requested",
    data: {
      id,
      topic,
    },
  });

  res.status(202).json({
    id,
    status: "pending",
  });
});
app.get("/reports/:id", (req, res) => {
  const { id } = req.params;

  const report = reports.get(id);

  if (!report) {
    return res.status(404).json({
      error: "Report not found",
    });
  }

  res.status(200).json(report);
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
      functions: [sayHello, makeReport],
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
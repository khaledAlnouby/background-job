const express = require("express");
const { serve } = require("inngest/express");

const { inngest } = require("./inngest/client");
const { sayHello } = require("./inngest/functions");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [sayHello],
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
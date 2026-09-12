const { Inngest } = require("inngest");

const inngest = new Inngest({
  id: "report-api",
  isDev: true,
});

module.exports = { inngest };
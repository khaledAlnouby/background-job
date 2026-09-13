const { inngest } = require("./client");
const { reports } = require("../reports");

const sayHello = inngest.createFunction(
  {
    id: "say-hello",
    triggers: [{ event: "test/hello" }],
  },
  async ({ step }) => {
    await step.sleep("wait-5-seconds", "5s");

    return "Hello from the background!";
  }
);

const makeReport = inngest.createFunction(
  {
    id: "make-report",
    triggers: [{ event: "report/requested" }],
  },
  async ({ event, step }) => {
    const { id, topic } = event.data;

    await step.sleep("do-the-slow-work", "8s");

    await step.run("build-report", async () => {
      const report = reports.get(id);

      reports.set(id, {
        ...report,
        status: "done",
        result: `Report generated for topic: ${topic}`,
      });
    });

    return "Report completed";
  }
);

module.exports = { sayHello, makeReport };
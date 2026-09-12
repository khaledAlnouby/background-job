const { inngest } = require("./client");

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

module.exports = { sayHello };
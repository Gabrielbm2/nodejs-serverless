import { MyStack } from "./stacks/MyStack";

export default {
  config(_input: any) {
    return {
      name: "nodejs-serverless-api",
      region: "us-west-2",
      sourcemaps: false,
    };
  },
  stacks(app: any) {
    app.stack(MyStack);
  },
};

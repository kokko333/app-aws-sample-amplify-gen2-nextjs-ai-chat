import { defineBackend } from "@aws-amplify/backend";
import { Tags } from "aws-cdk-lib";
import { auth } from "./auth/resource.js";
import { chatData, todoData } from "./data/resource.js";

const backend = defineBackend({
  auth,
  chatData,
  todoData,
});

const tags = Tags.of(backend.stack);
tags.add("Billing", "amplify-nextjs-sample");
tags.add("Project", "amplify-nextjs-sample");
tags.add("Environment", "development");

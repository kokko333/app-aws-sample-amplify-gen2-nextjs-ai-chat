import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { chatData, todoData } from "./data/resource.js";

defineBackend({
  auth,
  chatData,
  todoData,
});

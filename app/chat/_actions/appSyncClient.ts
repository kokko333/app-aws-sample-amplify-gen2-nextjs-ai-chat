import { generateClient } from "aws-amplify/api";
import type { ChatSchema } from "../../../amplify/data/resource";

export const client = generateClient<ChatSchema>();

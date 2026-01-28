"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./page.css";
import Link from "next/link";

const client = generateClient<Schema>();

export default function TodoPage() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user } = useAuthenticator();

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: data => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}&apos;s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <Link href="/">
        <button>← Back to Home</button>
      </Link>
    </main>
  );
}

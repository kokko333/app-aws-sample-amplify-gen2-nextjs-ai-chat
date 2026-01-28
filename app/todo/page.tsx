"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import styles from "./page.module.css";
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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{user?.signInDetails?.loginId}&apos;s todos</h1>
        <button className={styles.button} onClick={createTodo}>
          + new
        </button>
        <ul className={styles.list}>
          {todos.map(todo => (
            <li
              key={todo.id}
              className={styles.listItem}
              onClick={() => deleteTodo(todo.id)}
            >
              {todo.content}
            </li>
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a
            className={styles.link}
            href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/"
          >
            Review next steps of this tutorial.
          </a>
        </div>
        <Link href="/">
          <button className={styles.button}>← Back to Home</button>
        </Link>
      </main>
    </div>
  );
}

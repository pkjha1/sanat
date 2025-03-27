\`\`\`typescript
// lib/teachings.ts

import type { Teaching } from "@/types/teaching"

const teachings: Teaching[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
    content: `
      # Introduction to React

      React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

      ## Key Concepts

      *   **Components:** Reusable UI elements.
      *   **JSX:** A syntax extension to JavaScript that allows you to write HTML-like code in your JavaScript files.
      *   **Props:** Data passed from a parent component to a child component.
      *   **State:** Data that is managed within a component.

      ## Example

      \`\`\`jsx
      function MyComponent() {
        return <h1>Hello, world!</h1>;
      }
      \`\`\`
    `,
    level: "Beginner",
    tags: ["React", "JavaScript", "Frontend"],
    author: "John Doe",
    date: "2023-10-26",
    duration: "1 hour",
    resources: [
      {
        name: "React Official Website",
        url: "https://reactjs.org/",
      },
    ],
  },
  {
    id: "2",
    title: "Getting Started with Next.js",
    description:
      "A comprehensive guide to setting up and using Next.js, a React framework for building web applications.",
    content: `
      # Getting Started with Next.js

      Next.js is a React framework that enables you to build full-stack web applications. It provides features like:

      *   **Server-side Rendering (SSR):** Improves SEO and initial load time.
      *   **Static Site Generation (SSG):** Generates static HTML files at build time.
      *   **API Routes:** Create API endpoints directly in your Next.js application.
      *   **Routing:** Built-in routing system for navigating between pages.

      ## Installation

      \`\`\`bash
      npm install next react react-dom
      \`\`\`

      ## Creating a Page

      Create a file in the \`pages\` directory. For example, \`pages/index.js\`:

      \`\`\`jsx
      function HomePage() {
        return <h1>Welcome to Next.js!</h1>;
      }

      export default HomePage;
      \`\`\`
    `,
    level: "Intermediate",
    tags: ["Next.js", "React", "JavaScript", "Frontend", "Full-stack"],
    author: "Jane Smith",
    date: "2023-11-15",
    duration: "1.5 hours",
    resources: [
      {
        name: "Next.js Official Website",
        url: "https://nextjs.org/",
      },
    ],
  },
  {
    id: "3",
    title: "Mastering TypeScript",
    description:
      "Learn TypeScript, a superset of JavaScript that adds static typing to improve code quality and maintainability.",
    content: `
      # Mastering TypeScript

      TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It offers features like:

      *   **Static Typing:** Catch errors during development rather than at runtime.
      *   **Interfaces:** Define contracts for objects.
      *   **Generics:** Write reusable code that can work with different types.
      *   **Decorators:** Add metadata to classes and functions.

      ## Basic Types

      *   \`number\`: Represents numeric values.
      *   \`string\`: Represents text values.
      *   \`boolean\`: Represents true/false values.
      *   \`array\`: Represents an ordered collection of values.
      *   \`object\`: Represents a non-primitive type.

      ## Example

      \`\`\`typescript
      function greet(name: string): string {
        return \`Hello, \${name}!\`;
      }

      console.log(greet("World"));
      \`\`\`
    `,
    level: "Intermediate",
    tags: ["TypeScript", "JavaScript", "Backend", "Frontend"],
    author: "David Johnson",
    date: "2023-12-01",
    duration: "2 hours",
    resources: [
      {
        name: "TypeScript Official Website",
        url: "https://www.typescriptlang.org/",
      },
    ],
  },
  {
    id: "4",
    title: "Building RESTful APIs with Node.js and Express",
    description: "A step-by-step guide to creating RESTful APIs using Node.js and Express, a popular web framework.",
    content: `
      # Building RESTful APIs with Node.js and Express

      Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server. Express is a minimalist web framework for Node.js that provides a set of features for building web applications and APIs.

      ## Key Concepts

      *   **REST (Representational State Transfer):** An architectural style for building networked applications.
      *   **HTTP Methods:** Verbs that define the type of action to be performed on a resource (e.g., GET, POST, PUT, DELETE).
      *   **Middleware:** Functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

      ## Example

      \`\`\`javascript
      const express = require('express');
      const app = express();

      app.get('/api/users', (req, res) => {
        res.json([{ id: 1, name: 'John Doe' }]);
      });

      app.listen(3000, () => {
        console.log('Server listening on port 3000');
      });
      \`\`\`
    `,
    level: "Advanced",
    tags: ["Node.js", "Express", "API", "Backend"],
    author: "Emily Brown",
    date: "2024-01-10",
    duration: "2.5 hours",
    resources: [
      {
        name: "Node.js Official Website",
        url: "https://nodejs.org/",
      },
      {
        name: "Express Official Website",
        url: "https://expressjs.com/",
      },
    ],
  },
]

export default teachings
\`\`\`


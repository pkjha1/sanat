// Mock database helper

import { fetchData } from "./mock-data"

export async function executeQuery(query, params = []) {
  // Mock query execution
  console.log("Executing query:", query, "with params:", params)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Parse the query to determine what data to return
  if (query.toLowerCase().includes("from books")) {
    return {
      success: true,
      data: await fetchData("books"),
      error: null,
    }
  } else if (query.toLowerCase().includes("from places")) {
    return {
      success: true,
      data: await fetchData("places"),
      error: null,
    }
  } else if (query.toLowerCase().includes("from teachings")) {
    return {
      success: true,
      data: await fetchData("teachings"),
      error: null,
    }
  } else if (query.toLowerCase().includes("insert into")) {
    return {
      success: true,
      data: { id: Math.floor(Math.random() * 1000) + 4 },
      error: null,
    }
  } else if (query.toLowerCase().includes("update")) {
    return {
      success: true,
      data: { updated: true },
      error: null,
    }
  } else if (query.toLowerCase().includes("delete")) {
    return {
      success: true,
      data: { deleted: true },
      error: null,
    }
  }

  // Default response
  return {
    success: true,
    data: [],
    error: null,
  }
}


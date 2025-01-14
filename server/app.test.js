const request = require("supertest");
const express = require("express");
const db = require("./db"); // Mock this module
const app = require("./app"); // Import your Express app

// Mock the db module to simulate database interactions
jest.mock("./db", () => ({
  query: jest.fn(),
}));

describe("Todo API Endpoints", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test POST /todos (Create a Todo)
  it("should create a new todo", async () => {
    const newTodo = { description: "Test todo" };
    const insertedTodo = { todo_id: 1, description: "Test todo" };
    db.query.mockResolvedValueOnce({ rows: [insertedTodo] });

    const response = await request(app).post("/todos").send(newTodo);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(insertedTodo);
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [newTodo.description]
    );
  });

  // Test GET /todos (Get all Todos)
  it("should get all todos", async () => {
    const todos = [
      { todo_id: 1, description: "First todo" },
      { todo_id: 2, description: "Second todo" },
    ];
    db.query.mockResolvedValueOnce({ rows: todos });

    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(todos);
    expect(db.query).toHaveBeenCalledWith("SELECT * FROM todo");
  });

  // Test GET /todos/:id (Get a specific Todo by id)
  it("should get a todo by ID", async () => {
    const todo = { todo_id: 1, description: "Test todo" };
    db.query.mockResolvedValueOnce({ rows: [todo] });

    const response = await request(app).get("/todos/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(todo);
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM todo WHERE todo_id = $1",
      ["1"]
    );
  });

  // Test PUT /todos/:id (Update a Todo by id)
  it("should update a todo by ID", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(app)
      .put("/todos/1")
      .send({ description: "Updated todo" });

    expect(response.status).toBe(200);
    expect(response.body).toBe("Todo was updated!");
    expect(db.query).toHaveBeenCalledWith(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      ["Updated todo", "1"]
    );
  });

  // Test DELETE /todos/:id (Delete a Todo by id)
  it("should delete a todo by ID", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(app).delete("/todos/1");

    expect(response.status).toBe(200);
    expect(response.body).toBe("Todo was deleted!");
    expect(db.query).toHaveBeenCalledWith(
      "DELETE FROM todo WHERE todo_id = $1",
      ["1"]
    );
  });
});

const express = require("express");
const { getAllTodos, createNewTodo, deleteTodo, completeTodo, editTodo, favTodo, getTodos } = require("../controllers/TodoController");

//Initializing router and connecting database endpoints to database functions
const router = express.Router();

router.get("/get-all-todos", getAllTodos);

router.post("/new-todo", createNewTodo);

router.delete("/delete-todo", deleteTodo);

router.put("/complete-todo", completeTodo);

router.put("/fav-todo", favTodo);

router.post("/edit-todo", editTodo);

router.post("/get-todos", getTodos);

module.exports = router;


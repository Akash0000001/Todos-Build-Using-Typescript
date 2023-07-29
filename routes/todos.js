"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = { id: new Date().toISOString(), text: req.body.text };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo", todo: newTodo });
});
router.put("/todo/:todoId", (req, res, next) => {
    const todoIndex = todos.findIndex(todoItem => todoItem.id === req.params.todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(202).json({ message: "Updated Todo", todo: todos[todoIndex] });
    }
    res.status(404).json({ message: "Could not find a todo for this id" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const todoIndex = todos.findIndex(todoItem => todoItem.id === req.params.todoId);
    if (todoIndex >= 0) {
        todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
        return res.status(202).json({ message: "Deleted Todo", todo: todos });
    }
    res.status(404).json({ message: "Could not find a todo for this id" });
});
exports.default = router;

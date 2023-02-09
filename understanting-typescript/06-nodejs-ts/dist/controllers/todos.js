"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
// export const createTodo = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toFixed(7), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated the todo', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const removeId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === removeId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOS.filter(todo => todo.id !== removeId);
    res.json({ message: 'Deleted the todo' });
};
exports.deleteTodo = deleteTodo;

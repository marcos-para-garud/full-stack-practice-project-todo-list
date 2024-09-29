import { Router } from "express";
import app from "../../app.js";
import { createTodo , getTodos , updateTodo , deleteTodo } from "../controller/todo.controller.js"

const router = Router()

router.post('/todos' , createTodo)

router.get('/todos' , getTodos)

router.put('/todos/:id' , updateTodo)

router.delete('/todos/:id', deleteTodo);

export default router
const express = require('express');
const Router = express.Router();
const { TodoController } = require('../controllers/todoControler.js');

Router.post('/create', (req, res) => {
    const { Authorization, todo } = req.body;
    const todoControler = new TodoController();

    const result = todoControler.registerTodo({ Authorization, todo })
    console.log(result)
    
    res.send(result)
})

Router.post('/get', async (req, res) => {
    const { Authorization } = req.body;
    const todoControler = new TodoController();

    const result = await todoControler.getTodo({ Authorization })

    res.send(result)
})

Router.put('/update', async (req, res) => {
    const { Authorization, todo } = req.body;
    const todoControler = new TodoController();

    const result = await todoControler.updateTodo({ Authorization, todo })

    res.send(result)
})

Router.delete('/delete', async (req, res) => {
    const { Authorization, todo } = req.body;
    const todoControler = new TodoController();

    console.log(Authorization, todo.id);
    const result = await todoControler.deleteTodo({ Authorization, id: todo.id });

    res.send(result);
})

Router.delete('/delete-all', async (req, res) => {
    const { Authorization } = req.body;
    const todoControler = new TodoController();

    const result = await todoControler.deleteAllTodo({ Authorization })

    res.send(result)
})

module.exports = Router
const { TodoAcessData } = require('../models/todo');
const jwt = require('jsonwebtoken');
const { badRequest, ok } = require('../utils/httpResponse');

class TodoController {
    constructor() {
        this.dataAcess = new TodoAcessData();
        this.KEY = process.env.JWT_SECRET;
    }

    registerTodo(data) {
        const dataTodo = {
            title: data.todo['title'],
            description: data.todo['description'],
            status: 'pendente',
            created_at: new Date(),
            updated_at: new Date(),
        }

        if (!data.Authorization) return badRequest('Token não fornecido!');
        if (!data.todo['title']) return badRequest("Todo vazio!")

        try {
            const decoded = jwt.verify(data.Authorization, this.KEY);
            this.dataAcess.addTodo({ title: dataTodo.title, description: dataTodo.description, status: dataTodo.status, created_at: dataTodo.created_at, updated_at: dataTodo.updated_at, user_id: decoded.id });

            const status = ok('Todo criado com sucesso');
            return { status }
        } catch (error) {
            console.log(error)
            return badRequest('Usuario não esta logado')
        }

    }

    async getTodo(data) {
        if (!data.Authorization) return badRequest('Token não fornecido!');
    
        try {
            const decoded = jwt.verify(data.Authorization, this.KEY);
            const result = await this.dataAcess.getTodo(decoded.id);

            if (result.length === 0) return badRequest('Não foi possivel encontrar o todo')

            const status = ok('Todo encontrado com sucesso')
            return { status, result };
        } catch (error) {
            console.log(error)
            return badRequest('Usuario não esta logado')
        }
    }

    async updateTodo(data) {
        if (!data.Authorization) return badRequest('Token não fornecido!');

        const dataTodo = {
            id: data.todo['id'],
            title: data.todo['title'],
            description: data.todo['description'],
            updated_at: new Date(),
        }

        try {
            console.log('data', dataTodo.id)
            const decoded = jwt.verify(data.Authorization, this.KEY);
            const result = await this.dataAcess.updateTodo({ id: dataTodo.id, title: dataTodo.title, description: dataTodo.description, updated_at: dataTodo.updated_at });

            if (result.matchedCount === 0) return badRequest('Não foi possivel atualizar o todo')

            const status = ok('Todo atualizado com sucesso')
            return status;
        } catch (error) {
            console.log(error)
            return badRequest('Usuario não esta logado')
        }
    }

    async deleteTodo(data) {
        if (!data.Authorization) return badRequest('Token não fornecido!');

        try {
            const decoded = jwt.verify(data.Authorization, this.KEY);
            const result = await this.dataAcess.deleteTodo({ id: data.id, user_id: decoded.id });

            if (result.deletedCount === 0) return badRequest('Não foi possivel deletar o todo')

            const status = ok('Todo deletado com sucesso')
            return status;
        } catch (error) {
            console.log(error)
            return badRequest('Usuario não esta logado')
        }
    }

    async deleteAllTodo(data) {
        if (!data.Authorization) return badRequest('Token não fornecido!');

        try {
            const decoded = jwt.verify(data.Authorization, this.KEY);
            const result = await this.dataAcess.deleteAllTodo({ user_id: decoded.id });

            if (result.deletedCount === 0) return badRequest('Não foi possivel deletar os todos')

            const status = ok('Todo"s deletado com sucesso')
            return status;
        } catch (error) {
            console.log(error)
            return badRequest('Usuario não esta logado')
        }
    }
}

module.exports = { TodoController }
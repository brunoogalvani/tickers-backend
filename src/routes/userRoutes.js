import express from 'express'
import cors from 'cors'
import { authUser, criarUser, deletarUser, listarUsers } from '../controllers/userController.js'
import { criarEvento, deletarEvento, listarEventos } from '../controllers/eventoController.js'

const routes = (app) => {
    app.use(express.json())
    app.use(cors())

    // Rotas de Usuários
    app.get('/users', listarUsers)
    app.post('/users', criarUser)
    app.delete('/users/:id', deletarUser)
    app.post('/users/login', authUser)

    // Rotas de Eventos
    app.get('/eventos', listarEventos)
    app.post('/eventos', criarEvento)
    app.delete('/eventos/:id', deletarEvento)
}

export default routes
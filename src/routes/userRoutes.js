import express from 'express'
import { criarUser, deletarUser, listarUsers } from '../controllers/userController.js'

const routes = (app) => {
    app.use(express.json())
    app.get('/users', listarUsers)
    app.post('/users', criarUser)
    app.delete('/users/:id', deletarUser)
}

export default routes
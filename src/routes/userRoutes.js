import express from 'express'
import cors from 'cors'
import { authUser, criarUser, deletarUser, listarUserById, listarUsers } from '../controllers/userController.js'

const userRoutes = (app) => {
    app.use(express.json())
    app.use(cors())

    app.get('/users', listarUsers)
    app.get('users/:id', listarUserById)
    app.post('/users', criarUser)
    app.delete('/users/:id', deletarUser)
    app.post('/users/login', authUser)
}

export default userRoutes
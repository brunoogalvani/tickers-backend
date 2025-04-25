import express from 'express'
import { criarUser, listarUsers } from '../controllers/userController.js'

const routes = (app) => {
    app.use(express.json())
    app.get('/users', listarUsers)
    app.post('/users', criarUser)
}

export default routes
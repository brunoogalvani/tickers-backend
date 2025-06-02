import { atualizarUser, authUser, buscarEventosDeUser, criarUser, deletarUser, listarUserById, listarUsers } from '../controllers/userController.js'

const userRoutes = (app) => {
    app.get('/users', listarUsers)
    app.get('/users/:id', listarUserById)
    app.post('/users', criarUser)
    app.delete('/users/:id', deletarUser)
    app.patch('/users/:id', atualizarUser)
    app.post('/users/login', authUser)
    app.get('/users/:id/eventos', buscarEventosDeUser)
}

export default userRoutes
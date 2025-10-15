import { adicionarFavorito, atualizarUser, authUser, buscarComprasDeUser, buscarEventosDeUser, criarUser, deletarUser, listarFavoritos, listarUserById, listarUsers, removerFavorito, verificarFavorito } from '../controllers/userController.js'

const userRoutes = (app) => {
    app.get('/users', listarUsers)
    app.get('/users/:id', listarUserById)
    app.post('/users', criarUser)
    app.delete('/users/:id', deletarUser)
    app.patch('/users/:id', atualizarUser)
    app.post('/users/login', authUser)
    app.get('/users/:id/eventos', buscarEventosDeUser)
    app.get('/users/:id/compras', buscarComprasDeUser)

    app.get('/users/:userId/favoritos', listarFavoritos)
    app.post('/users/:userId/favoritos', adicionarFavorito)
    app.delete('/users/:userId/favoritos/:eventoId', removerFavorito)
    app.get('/users/:userId/favoritos/check/:eventoId', verificarFavorito)
}

export default userRoutes
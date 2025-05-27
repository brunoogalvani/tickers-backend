import { atualizarEvento, criarEvento, deletarEvento, listarEventos } from '../controllers/eventoController.js'

const eventoRoutes = (app) => {
    app.get('/eventos', listarEventos)
    app.post('/eventos', criarEvento)
    app.delete('/eventos/:id', deletarEvento)
    app.patch('/eventos/:id', atualizarEvento)
}

export default eventoRoutes
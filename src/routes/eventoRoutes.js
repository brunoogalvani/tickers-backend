import express from 'express'
import cors from 'cors'
import { atualizarEvento, criarEvento, deletarEvento, listarEventos } from '../controllers/eventoController.js'

const eventoRoutes = (app) => {
    app.use(express.json())
    app.use(cors())

    app.get('/eventos', listarEventos)
    app.post('/eventos', criarEvento)
    app.delete('/eventos/:id', deletarEvento)
    app.patch('/eventos/:id', atualizarEvento)
}

export default eventoRoutes
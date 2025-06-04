import multer from 'multer'
import path from 'path'
import os from 'os'
import { atualizarEvento, criarEvento, deletarEvento, listarEventos } from '../controllers/eventoController.js'
import { parseLocalMiddleware } from '../middleware/parseLocalMiddleware.js'

const uploadDir =  os.tmpdir()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

const eventoRoutes = (app) => {
    app.get('/eventos', listarEventos)
    app.post('/eventos', upload.single('imagemCapa'), parseLocalMiddleware, criarEvento)
    app.delete('/eventos/:id', deletarEvento)
    app.patch('/eventos/:id', upload.single('imagemCapa'), atualizarEvento)
}

export default eventoRoutes
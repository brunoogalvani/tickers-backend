import express from 'express'
import routes from './src/routes/userRoutes.js'

const app = express()

routes(app)

app.listen(8080, () => {
    console.log('Servidor rodando -> http://localhost:8080')
})

import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import userRoutes from './routes/userRoutes.js'
import eventoRoutes from './routes/eventoRoutes.js'
import swaggerUi from 'swagger-ui-dist'
import swaggerDocs from './swagger-doc.js'

const app = express()

app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

userRoutes(app)
eventoRoutes(app)

app.use('/api-docs', express.static(swaggerUi.getAbsoluteFSPath()))

app.get('/api-docs/swagger', (req, res) => {
    try {
        const indexPath = path.join(swaggerUi.getAbsoluteFSPath(), 'index.html')
        let html = fs.readFileSync(indexPath, 'utf8')
        html = html.replace(
            'https://petstore.swagger.io/v2/swagger.json',
            '/swagger.json'
        )
        res.send(html)
    } catch (error) {
        console.error('Erro ao carregar Swagger UI:', error)
        res.status(500).send('Erro ao carregar documentação')
    }
})

app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocs)
})

app.listen(8080, () => {
    console.log('Servidor rodando -> http://localhost:8080/api-docs')
})

// necessário para rodar o projeto -> npm install

// necessário para rodar o projeto -> criar arquivo .env e copiar a variável abaixo 
// DATABASE_URL="mongodb+srv://brunnolsn:EJv5V1zsXPTuIV8U@tickers.cwguffk.mongodb.net/Tickers?retryWrites=true&w=majority&appName=Tickers"

// necessário para rodar o projeto -> npx prisma generate
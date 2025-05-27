import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import eventoRoutes from './routes/eventoRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger-doc.js'

const app = express()

app.use(express.json())
app.use(cors())

userRoutes(app)
eventoRoutes(app)

// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {customCssUrl: CSS_URL}))

app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocs)
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(8080, () => {
      console.log('Servidor rodando -> http://localhost:8080/api-docs')
  })
}

export default app

// necessário para rodar o projeto -> npm install

// necessário para rodar o projeto -> criar arquivo .env e copiar a variável abaixo 
// DATABASE_URL="mongodb+srv://brunnolsn:EJv5V1zsXPTuIV8U@tickers.cwguffk.mongodb.net/Tickers?retryWrites=true&w=majority&appName=Tickers"

// necessário para rodar o projeto -> npx prisma generate
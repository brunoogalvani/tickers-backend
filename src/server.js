import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import eventoRoutes from './routes/eventoRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger-doc.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: ['https://tickers-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use('/uploads', express.static('uploads'))

userRoutes(app)
eventoRoutes(app)

// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: 
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
}))

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
// CLOUDINARY_URL=cloudinary://763427534844265:74gaMlwRGJEQCm939fAe30n9-7s@dexmww3sm
// CLOUDINARY_CLOUD_NAME=dexmww3sm
// CLOUDINARY_API_KEY=763427534844265
// CLOUDINARY_API_SECRET=74gaMlwRGJEQCm939fAe30n9-7s

// necessário para rodar o projeto -> npx prisma generate
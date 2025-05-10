import express from 'express'
import userRoutes from './routes/userRoutes.js'
import eventoRoutes from './routes/eventoRoutes.js'

const app = express()

userRoutes(app)
eventoRoutes(app)

app.listen(8080, () => {
    console.log('Servidor rodando -> http://localhost:8080')
})

// necessário para rodar o projeto -> npm install

// necessário para rodar o projeto -> criar arquivo .env e copiar a variável abaixo 
// DATABASE_URL="mongodb+srv://brunnolsn:EJv5V1zsXPTuIV8U@tickers.cwguffk.mongodb.net/Tickers?retryWrites=true&w=majority&appName=Tickers"

// necessário para rodar o projeto -> npx prisma generate
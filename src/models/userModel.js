import connectDB from "../config/dbconfig.js"
import dotenv from 'dotenv'
dotenv.config()

const uri = "mongodb+srv://brunnolsn:EJv5V1zsXPTuIV8U@tickers.cwguffk.mongodb.net/?retryWrites=true&w=majority&appName=Tickers"
const conexao = await connectDB(uri)

export async function getUsers() {
    const db = conexao.db("Tickers")
    const colecao = db.collection("users")
    return colecao.find().toArray()
}
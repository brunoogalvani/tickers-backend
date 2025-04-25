import { getUsers, postUser } from "../models/userModel.js"

export async function listarUsers(req, res) {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log("Erro ao retornar usuários", error)
    }
}

export async function criarUser(req, res) {
    const newUser = req.body
    try {
        await postUser(newUser)
        res.status(201).json()
    } catch (error) {
        console.log("Erro ao criar usuário", error)
    }
}
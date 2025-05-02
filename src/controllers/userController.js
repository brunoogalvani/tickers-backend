import { PrismaClient } from '../generated/prisma/client.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()
try {
    console.log("Prisma Client inicializado com sucesso!")
} catch (error) {
    console.error("Erro ao inicializar Prisma Client: ", error)
}

export async function listarUsers(req, res) {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.log("Erro ao retornar usuários", error)
    }
}

export async function criarUser(req, res) {
    const { nome, email, role, cep, senha } = req.body

    if (!nome || !email || !cep || !senha) {
        return res.status(400).json({error: "Faltam dados obrigatórios"})
    }

    if (await prisma.user.findUnique({where: {email: email},})) {
      return res.status(400).json({error: "O email já está sendo utilizado"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(senha, salt)

    try {
        await prisma.user.create({
            data: {
                nome,
                email,
                role: role || 'USER',
                cep,
                senha: hashPassword,
            },
        })

        res.status(201).json()
    } catch (error) {
        console.log("Erro ao criar usuário", error)
        res.status(500).json({error: "Erro ao criar usuário"})
    }
}

export async function deletarUser(req, res) {
    const { id } = req.params

    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        })

        res.status(200).json("Usuário deletado com sucesso", user)
    } catch (error) {
        console.error("Erro ao deletar usuário", error)
        res.status(500).json({error: "Erro ao deletar usuário"})
    }
}
import { PrismaClient } from '../generated/prisma/client.js'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export async function listarUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                nome: true,
                telefone: true,
                email: true,
                role: true,
                cep: true,
                senha: false
            }
        })
        res.status(200).json(users)
    } catch (error) {
        console.log("Erro ao retornar usuários", error)
        res.status(500).json({error: "Erro ao retornar usuários"})
    }
}

export async function listarUserById(req, res) {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }, 
            select: {
                id: true,
                nome: true,
                telefone: true,
                email: true,
                role: true,
                cep: true,
                senha: false
            }
        })
        res.status(200).json(user)
    } catch (error) {
        console.log("Erro ao retornar usuário", error)
        res.status(500).json({error: "Erro ao retornar usuário"})
    }
}

export async function criarUser(req, res) {
    const { nome, email, telefone, role, cep, senha } = req.body

    if (!nome || !email || !telefone || !cep || !senha) {
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
                telefone,
                role,
                cep,
                senha: hashPassword,
            },
        })

        res.status(201).json({message: "Usuário criado com sucesso!"})
    } catch (error) {
        console.log("Erro ao criar usuário", error)
        res.status(500).json({error: "Erro ao criar usuário"})
    }
}

export async function deletarUser(req, res) {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({where: {id}})

        if (!user) {
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        await prisma.user.delete({where: {id}})

        res.status(200).json({message: "Usuário deletado com sucesso", data: user})
    } catch (error) {
        console.error("Erro ao deletar usuário", error)
        res.status(500).json({error: "Erro ao deletar usuário"})
    }
}

export async function atualizarUser(req, res) {
    const { id } = req.params
    const { nome, email, telefone, role, cep, senha } = req.body

    if (!id) {
        return res.status(400).json({error: "ID do usuário é obrigatório"})
    }

    const userExistente = await prisma.user.findUnique({where: {id}})

    if (!userExistente) {
        return res.status(404).json({error: "Usuário não existente"})
    }

    // Se outro usuário já tem o email, deve retornar 409 Conflict
    if (email && email !== userExistente.email) {
        const emailExiste = await prisma.user.findUnique({where: {email}})
        if (emailExiste) {
            return res.status(409).json({error: "Email já está em uso"})
        }
    }
    
    let hashPassword = ''

    if (senha && senha.trim() !== '') {
        const salt = await bcrypt.genSalt(10)
        hashPassword = await bcrypt.hash(senha, salt)
    }

    const dataAtualizacao = {}
    if (nome) dataAtualizacao.nome = nome
    if (email) dataAtualizacao.email = email
    if (telefone) dataAtualizacao.telefone = telefone
    if (role) dataAtualizacao.role = role
    if (cep) dataAtualizacao.cep = cep
    if (hashPassword) dataAtualizacao.senha = hashPassword

    try {
        const userAtualizado = await prisma.user.update({
            where: {id},
            data: dataAtualizacao
        })

        return res.status(200).json({message: "Usuário atualizado com sucesso!", data: userAtualizado})
    } catch (error) {
        console.error("Erro ao atualizar usuário", error)
        res.status(500).json({error: "Erro ao atualizar usuário"})
    }
}

export async function authUser(req, res) {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({error: "Faltam dados obrigatórios"})
    }

    try {
        const user = await prisma.user.findUnique({where: {email: email}})

        if (!user) {
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        const isMatch = await bcrypt.compare(senha, user.senha)

        if (!isMatch) {
            return res.status(401).json({error: "Credenciais inválidas"})
        }

        return res.status(200).json({message: "Usuário autenticado", id: user.id, role: user.role})
        
    } catch (error) {
        console.error("Erro na autenticação de usuário", error)
        res.status(500).json({error: "Erro na autenticação de usuário"})
    }
}

export async function buscarEventosDeUser(req, res) {
    const { id } = req.params

    try {
        const usuario = await prisma.user.findUnique({where: {id}, include: {eventosCriados: true}})

        if (!usuario) {
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        res.status(200).json(usuario.eventosCriados)
    } catch (error) {
        console.error("Erro ao buscar eventos do usuário", error)
        return res.status(500).json({error: "Erro ao buscar eventos do usuário"})
    }
}
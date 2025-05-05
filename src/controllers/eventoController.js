import { PrismaClient } from '../generated/prisma/client.js'
const prisma = new PrismaClient()

export async function listarEventos(req, res) {
    try {
        const eventos = await prisma.evento.findMany()
        res.status(200).json(eventos)
    } catch (error) {
        console.error("Erro ao listar eventos", error)
        res.status(500).json({error: "Erro ao listar eventos"})
    }
}

export async function criarEvento(req, res) {
    const { titulo, descricao, categoria, dataInicioISO, dataInicio, dataFim, local, preco, imagemCapa } = req.body

    if (!titulo, !descricao, !categoria, !dataInicioISO, !dataInicio, !local, !preco, !imagemCapa) {
        return res.status(400).json({error: "Faltam dados obrigatórios"})
    }

    if (await prisma.evento.findFirst({where: {titulo: titulo, status: "ativo"}})) {
        return res.status(400).json({error: "Já existe um evento com este nome"})
    }

    try {
        await prisma.evento.create({
            data: {
                titulo,
                descricao,
                categoria,
                dataInicioISO,
                dataInicio,
                dataFim: dataFim || null,
                local: {
                    nome: local.nome,
                    endereco: local.endereco,
                    cidade: local.cidade,
                    estado: local.estado,
                    cep: local.cep
                },
                preco,
                imagemCapa
            }
        })

        return res.status(201).json({message: "Evento criado com sucesso!"});
    } catch (error) {
        console.error("Erro ao criar evento", error)
        res.status(500).json({error: "Erro ao criar evento"})
    }
}

export async function deletarEvento(req, res) {
    const { id } = req.params

    try {
        const evento = await prisma.evento.delete({where: {id: id}})
        res.status(200).json("Evento deletado com sucesso", evento)
    } catch (error) {
        console.error("Erro ao deletar evento", error)
        res.status(500).json({error: "Erro ao deletar evento"})
    }
}

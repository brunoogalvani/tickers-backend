import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { PrismaClient } from '../generated/prisma/client.js'
const prisma = new PrismaClient()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function listarEventos(req, res) {
    try {
        const eventos = await prisma.evento.findMany()
        res.status(200).json(eventos)
    } catch (error) {
        console.error("Erro ao listar eventos", error)
        res.status(500).json({error: "Erro ao listar eventos"})
    }
}

export async function listarEventoById(req, res) {
    const { id } = req.params

    try {
        const evento = await prisma.evento.findUnique({where: {id}})

        if (!evento) {
            return res.status(404).json({error: "Evento não existe"})
        }

        res.status(200).json(evento)
    } catch (error) {
        console.error("Erro ao encontrar evento", error)
        res.status(500).json({error: "Erro ao encontrar evento"})
    }
}

export async function criarEvento(req, res) {
    const { titulo, descricao, categoria, dataInicio, horaInicio, dataFim, local, preco, criadoPorId, qtdIngressos } = req.body
    const imagemCapa = req.file?.path

    if (!titulo || !descricao || !categoria || !dataInicio || !horaInicio || !local || !preco || !criadoPorId || !qtdIngressos) {
        return res.status(400).json({error: "Faltam dados obrigatórios"})
    }

    if (await prisma.evento.findFirst({where: {titulo: titulo, status: "ativo"}})) {
        return res.status(409).json({error: "Já existe um evento com este nome"})
    }

    try {
        const [dia, mes, ano] = dataInicio.split('/');
        const [hora, minuto] = horaInicio.split(':');

        const localDate = new Date(
        parseInt(ano),
        parseInt(mes) - 1,
        parseInt(dia),
        parseInt(hora),
        parseInt(minuto)
        );

        const dataInicioISO = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

        let resultado = ''

        if (imagemCapa) {
            try {
                resultado = await cloudinary.uploader.upload(imagemCapa, { folder: 'tickers' })
            } catch (error) {
                if (fs.existsSync(imagemCapa)) fs.unlinkSync(imagemCapa)
                throw error
            } finally {
                if (fs.existsSync(imagemCapa)) fs.unlinkSync(imagemCapa)
            }
        }

        await prisma.evento.create({
            data: {
                titulo,
                descricao,
                categoria,
                dataInicioISO,
                dataInicio,
                horaInicio,
                dataFim: dataFim || null,
                local: {
                    nome: local.nome,
                    endereco: local.endereco,
                    cidade: local.cidade,
                    estado: local.estado,
                    cep: local.cep
                },
                preco: Number(preco),
                imagemCapa: resultado.secure_url || null,
                imagemCapaPublicId: resultado.public_id || null,
                criadoPorId,
                qtdIngressos: Number(qtdIngressos)
            }
        })

        return res.status(201).json({message: "Evento criado com sucesso!"});
    } catch (error) {
        console.error("Erro ao criar evento", error)
        res.status(500).json({error: "Erro ao criar evento:"})
    }
}

export async function deletarEvento(req, res) {
    const { id } = req.params

    try {
        const evento = await prisma.evento.findUnique({where: {id}})

        if (!evento) {
            return res.status(404).json({error: "Evento não encontrado"})
        }

        if (evento.imagemCapaPublicId) {
            await cloudinary.uploader.destroy(evento.imagemCapaPublicId)
        }

        await prisma.evento.delete({where: {id}})
        res.status(200).json({ message: "Evento deletado com sucesso", data: evento })
    } catch (error) {
        console.error("Erro ao deletar evento", error)
        res.status(500).json({error: "Erro ao deletar evento"})
    }
}

export async function atualizarEvento(req, res) {
    const { id } = req.params
    const { titulo, descricao, categoria, dataInicio, horaInicio, dataFim, local, preco, criadoPorId, qtdIngressos } = req.body
    const imagemCapa = req.file?.path
    
    if (!id) {
        return res.status(400).json({error: "ID do evento é obrigatório"})
    }

    const dataAtualizacao = {}

    if (titulo) dataAtualizacao.titulo = titulo
    if (descricao) dataAtualizacao.descricao = descricao
    if (categoria) dataAtualizacao.categoria = categoria
    if (dataInicio) dataAtualizacao.dataInicio = dataInicio
    if (horaInicio) dataAtualizacao.horaInicio = horaInicio
    if (dataInicio || horaInicio) {
        const [dia, mes, ano] = dataInicio.split('/');
        const [hora, minuto] = horaInicio.split(':');

        const localDate = new Date(
            parseInt(ano),
            parseInt(mes) - 1,
            parseInt(dia),
            parseInt(hora),
            parseInt(minuto)
        );

        const dataInicioISO = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

        dataAtualizacao.dataInicioISO = dataInicioISO
    }
    if (dataFim) dataAtualizacao.dataFim = dataFim
    if (preco) dataAtualizacao.preco = Number(preco)
    if (criadoPorId) dataAtualizacao.criadoPorId = criadoPorId
    if (qtdIngressos) dataAtualizacao.qtdIngressos = Number(qtdIngressos)
    if (local) {
        dataAtualizacao.local = {
            update: {
                ...(local.nome && { nome: local.nome }),
                ...(local.endereco && { endereco: local.endereco }),
                ...(local.cidade && { cidade: local.cidade }),
                ...(local.estado && { estado: local.estado }),
                ...(local.cep && { cep: local.cep }),
            }
        }
    }

    try {
        const eventoExistente = await prisma.evento.findUnique({where: { id }})

        if (!eventoExistente) {
            return res.status(404).json({error: "Evento não encontrado"})
        }

        if (imagemCapa) {
            if (eventoExistente.imagemCapaPublicId) {
                await cloudinary.uploader.destroy(eventoExistente.imagemCapaPublicId)
            }
            
            const resultado = await cloudinary.uploader.upload(imagemCapa, { folder: 'tickers' })

            if (fs.existsSync(imagemCapa)) {
                fs.unlinkSync(imagemCapa)
            }

            dataAtualizacao.imagemCapa = resultado.secure_url
            dataAtualizacao.imagemCapaPublicId = resultado.public_id
        }

        const eventoAtualizado = await prisma.evento.update({
            where: { id },
            data: dataAtualizacao 
        })

        return res.status(200).json({message: "Evento atualizado com sucesso", data: eventoAtualizado})
    } catch (error) {
        console.error("Erro ao atualizar evento", error)
        res.status(500).json({error: "Erro ao atualizar evento"})
    }
}

export async function cancelarEvento(req, res) {
    const { id } = req.params

    try {
        const evento = await prisma.evento.findUnique({
            where: { id },
            include: { compras: true }
        })

        if (!evento) {
            return res.status(404).json({error: "Evento não encontrado"})
        }

        if (evento.status === 'cancelado') {
            return res.status(400).json({error: "Evento já está cancelado"})
        }

        if (evento.status === 'encerrado') {
            return res.status(400).json({error: "Não é possível cancelar evento encerrado"})
        }

        const eventoAtualizado = await prisma.evento.update({
            where: { id },
            data: { status: 'cancelado' }
        })

        if (evento.compras.length > 0) {
            console.log(`⚠️ Evento "${evento.titulo}" cancelado. ${evento.compras.length} compra(s) afetada(s)`)
        }

        return res.status(200).json({
            message: "Evento cancelado com sucesso",
            data: eventoAtualizado,
            comprasAfetadas: evento.compras.length
        })
    } catch (error) {
        console.error("Erro ao cancelar evento", error)
        res.status(500).json({error: "Erro ao cancelar evento"})
    }
}

export async function buscarComprasPorEvento(req, res) {
    const { id } = req.params

    try {
        const evento = await prisma.evento.findUnique({where: {id}})
        
        if (!evento) {
            return res.status(404).json({error: "Evento não encontrado"})
        }

        const compras = await prisma.compra.findMany({
            where: {eventoId: id}, 
            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        telefone: true
                    }
                }
            },
            orderBy: {
                data: 'desc'
            }
        })

        const totalArrecadado = evento.qtdIngressosVendidos * evento.preco
        const ingressosDisponiveis = evento.qtdIngressos - evento.qtdIngressosVendidos
        const percentualVendido = ((evento.qtdIngressosVendidos / evento.qtdIngressos) * 100).toFixed(2)

        res.status(200).json({
            compras,
            estatisticas: {
                totalCompras: compras.length,
                ingressosVendidos: evento.qtdIngressosVendidos,
                ingressosDisponiveis: ingressosDisponiveis,
                totalIngressos: evento.qtdIngressos,
                percentualVendido: `${percentualVendido}%`,
                valorArrecadado: totalArrecadado,
                precoUnitario: evento.preco,
                statusEvento: evento.status
            }
        })
    } catch (error) {
        console.error("Erro ao listar compras do evento", error)
        res.status(500).json({error: "Erro ao listar compras do evento"})
    }
}

import { PrismaClient } from '../generated/prisma/client.js'
const prisma = new PrismaClient()

export async function listarCompras(req, res) {
    try {
        const compras = await prisma.compra.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                evento: {
                    select: {
                        id: true,
                        titulo: true,
                        dataInicio: true,
                        horaInicio: true,
                        local: true,
                        preco: true
                    }
                }
            }
        })
        res.status(200).json(compras)
    } catch (error) {
        console.error("Erro ao listar compras", error)
        res.status(500).json({error: "Erro ao listar compras"})
    }
}

export async function listarCompraById(req, res) {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({error: "ID da compra é obrigatório"})
    }

    try {
        const compra = await prisma.compra.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        telefone: true
                    }
                },
                evento: {
                    select: {
                        id: true,
                        titulo: true,
                        descricao: true,
                        dataInicio: true,
                        horaInicio: true,
                        local: true,
                        preco: true,
                        imagemCapa: true
                    }
                }
            }
        })

        if (!compra) {
            return res.status(404).json({error: "Compra não encontrada"})
        }

        res.status(200).json(compra)
    } catch (error) {
        console.error("Erro ao encontrar compra", error)
        res.status(500).json({error: "Erro ao encontrar compra"})
    }
}

export async function criarCompra(req, res) {
    const { userId, eventoId, qtd } = req.body

    if (!userId || !eventoId || !qtd) {
        return res.status(400).json({error: "Faltam dados obrigatórios"})
    }

    if (qtd <= 0) {
        return res.status(400).json({error: "Quantidade de ingressos deve ser maior que zero"})
    }

    try {
        const usuario = await prisma.user.findUnique({where: {id: userId}})
        if (!usuario) {
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        const evento = await prisma.evento.findUnique({where: {id: eventoId}})
        if (!evento) {
            return res.status(404).json({error: "Evento não encontrado"})
        }

        if (evento.status !== "ativo") {
            return res.status(400).json({error: "Evento não está disponível para compra"})
        }

        const ingressosDisponiveis = evento.qtdIngressos - evento.qtdIngressosVendidos

        if (qtd > ingressosDisponiveis) {
            return res.status(400).json({
                error: "Quantidade de ingressos indisponível",
                disponiveis: ingressosDisponiveis
            })
        }

        const resultado = await prisma.$transaction(async (tx) => {
            const compra = await tx.compra.create({
                data: {
                    userId,
                    eventoId,
                    qtd: Number(qtd)
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    evento: {
                        select: {
                            id: true,
                            titulo: true,
                            dataInicio: true,
                            horaInicio: true,
                            preco: true
                        }
                    }
                }
            })

            const novaQtdVendidos = evento.qtdIngressosVendidos + Number(qtd)

            const dataAtualizacao = {
                qtdIngressosVendidos: novaQtdVendidos
            }

            if (novaQtdVendidos >= evento.qtdIngressos) {
                dataAtualizacao.status = 'encerrado'
                console.log(`✅ Evento "${evento.titulo}" encerrado automaticamente - Ingressos esgotados!`)
            }

            await tx.evento.update({
                where: { id: eventoId },
                data: dataAtualizacao
            })

            return compra
        })

        return res.status(201).json({
            message: "Compra realizada com sucesso!",
            data: resultado,
            valorTotal: evento.preco * qtd,
            ingressosRestantes: evento.qtdIngressos - (evento.qtdIngressosVendidos + Number(qtd))
        })
    } catch (error) {
        console.error("Erro ao criar compra", error)
        res.status(500).json({error: "Erro ao criar compra"})
    }
}

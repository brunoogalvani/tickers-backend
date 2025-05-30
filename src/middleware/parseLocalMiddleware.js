export function parseLocalMiddleware(req, res, next) {
    try {
        if (typeof req.body.local === 'string') {
            req.body.local = JSON.parse(req.body.local)
        }

        next()
    } catch (error) {
        console.error('Erro ao fazer parse do local', error)
        return res.status(400).json({error: "Formato inválido para o campo local"})
    }
}
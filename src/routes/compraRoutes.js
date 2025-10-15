import { criarCompra, listarCompraById, listarCompras } from "../controllers/compraController.js"

const compraRoutes = (app) => {
    app.get('/compras', listarCompras)
    app.get('/compras/:id', listarCompraById)
    app.post('/compras', criarCompra)
}

export default compraRoutes
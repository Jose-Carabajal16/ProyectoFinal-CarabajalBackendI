import { Router } from "express";
import CartManager from "../managers/CartManager.js";



const router = Router();
const cartManager = new CartManager()

router.get("/", async(req, res)=>{
    try {
        const carts= await cartManager.getAll(req.query)
        res.status(200).json({ status: "success", payload:carts})
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message})
        
    }
})
router.get("/:id", async(req, res)=>{
    try {
        const cart = await cartManager.getOneById(req.params?.id)
        res.status(200).json({ status: "success", payload: cart})
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message})
        
    }
})
router.post("/", async (req, res) => {
    try {

        console.log(req.body); // Verificar los datos del formulario
        console.log(req.file); // Verificar el archivo subido

        // Crear el carto con los datos recibidos
        const cart = await cartManager.insertOne(req.body, req.file);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        // Manejo de errores
        res.status(400).json({ status: "error", message: error.message });
    }
})

// Ruta para incrementar en una unidad o agregar un ingrediente específico en una receta por su ID
router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;  // Obtener el id del carrito (cid) y el id del producto (pid)
        const { quantity } = req.body;    // Obtener la cantidad desde el cuerpo de la solicitud (si no se proporciona, se usará 1)

        // Usar el método addOneIngredient para agregar el producto al carrito existente
        const cart = await cartManager.addOneProduct(cid, pid, quantity || 1);

        // Devolver el carrito actualizado como respuesta
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router
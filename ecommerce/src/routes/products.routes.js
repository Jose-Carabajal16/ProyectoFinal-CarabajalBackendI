import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import uploader from "../utils/uploader.js"; // Ajusta la ruta si es necesario


const router = Router();
const productManager = new ProductManager();




router.get("/", async(req, res)=>{
    try {
        const products = await productManager.getAll(req.query)
        res.status(200).json({ status: "success", payload: products})
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message})
        
    }
})
router.get("/:id", async(req, res)=>{
    try {
        const product = await productManager.getOneById(req.params?.id)
        res.status(200).json({ status: "success", payload: product})
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message})
        
    }
})
router.post("/", async (req, res) => {
    try {
        // Promisificar la lógica del uploader
        await new Promise((resolve, reject) => {
            uploader.single("thumbnail")(req, res, (err) => {
                if (err) return reject(err); // Si hay error, rechazar la promesa
                resolve(); // Si no hay error, resolver la promesa
            });
        });

        console.log(req.body); // Verificar los datos del formulario
        console.log(req.file); // Verificar el archivo subido

        // Crear el producto con los datos recibidos
        const product = await productManager.insertOne(req.body, req.file);
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        // Manejo de errores
        res.status(400).json({ status: "error", message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        // Promisificar la lógica del uploader
        await new Promise((resolve, reject) => {
            uploader.single("thumbnail")(req, res, (err) => {
                if (err) return reject(err); // Si hay error, rechazar la promesa
                resolve(); // Si no hay error, resolver la promesa
            });
        });
        console.log("req.body:", req.body);  // Verifica los datos del cuerpo
        console.log("req.file:", req.file);  // Verifica el archivo recibido

        const product = await productManager.updateOneById(req.params?.id, req.body, req.file);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});



router.delete("/:id", async(req, res)=>{
    try {
        const product = await productManager.deleteOneById(req.params?.id)
        res.status(200).json({ status: "success", payload: product})
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message})
        
    }
})

export default router
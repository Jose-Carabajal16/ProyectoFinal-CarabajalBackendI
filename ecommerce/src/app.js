import express from "express";
import paths from "./utils/paths.js";
import { connectDB  } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";

import routerProducts from "./routes/products.routes.js";
import routerCarts from "./routes/carts.routes.js";
import routerViewHome from "./routes/home.view.router.js";

// Se crea una instancia de la aplicación Express
const app = express();

connectDB();
// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8086;

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());


// Configuración del motor de plantillas
configHandlebars(app);
//public
app.use("/api/public", express.static(paths.public))


app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerViewHome);
// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);

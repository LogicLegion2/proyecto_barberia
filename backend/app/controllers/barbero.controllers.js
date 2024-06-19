import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarBarbero = async (req, res) => {
    try {
        const [rowsBar] = await pool.query("CALL LL_VER_BARBERO()");
        const [rowsSer] = await pool.query("CALL LL_VER_SERVICIOS()");
        const [rowsPro] = await pool.query("CALL LL_VER_PRODUCTOS()"); 
        const [rowsOfe] = await pool.query("CALL LL_VER_OFERTAS()");
        const [rowsUbi] = await pool.query("CALL LL_VER_UBICACIONES()");
        const [rowsPre] = await pool.query("CALL LL_VER_PREGUNTAS()");
        rowsBar.forEach(barbero => {
            if (barbero.foto) {
                barbero.foto = Buffer.from(barbero.foto).toString('base64');
            }
        });
        rowsSer.forEach(servicio => {
            if (servicio.fotoServicio) {
                servicio.fotoServicio = Buffer.from(servicio.fotoServicio).toString('base64');
            }
        });
        res.render("views.barbero.ejs", { barberos: rowsBar, servicios: rowsSer, productos: rowsPro, ofertas: rowsOfe, ubicaciones: rowsUbi, preguntas: rowsPre });
        res.render("views.pag_admin.ejs", { barberos: rowsBar})
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarBarberoAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_BARBERO()");
        rows.forEach(barbero => {
            if (barbero.foto) {
                barbero.foto = Buffer.from(barbero.foto).toString('base64');
            }
        });
        res.render("views.pag_admin.ejs", { barberos: rows[0]})
    } catch (error) {
        res.status(500).json(error);
    }
};

export const buscar = async (req, res) => {
    try {
        const { desc, tipo } = req.query;

        if (!desc || !tipo) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda y tipo" });
        }

        let barberos = [];
        let servicios = [];
        let productos = [];
        let ofertas = [];
        let ubicaciones = [];
        let preguntas = [];

        // Obtener todos los barberos y servicios
        const [rowsBar] = await pool.query("CALL LL_VER_BARBERO()");
        const [rowsSer] = await pool.query("CALL LL_VER_SERVICIOS()");
        const [rowsPro] = await pool.query("CALL LL_VER_PRODUCTOS()");
        const [rowsOfe] = await pool.query("CALL LL_VER_OFERTAS()");
        const [rowsUbi] = await pool.query("CALL LL_VER_UBICACIONES()");
        const [rowsPre] = await pool.query("CALL LL_VER_PREGUNTAS()");

        // Convierte las imágenes a base64
        rowsBar.forEach(barbero => {
            if (barbero.foto) {
                barbero.foto = Buffer.from(barbero.foto).toString('base64');
            }
        });
        rowsSer.forEach(servicio => {
            if (servicio.fotoServicio) {
                servicio.fotoServicio = Buffer.from(servicio.fotoServicio).toString('base64');
            }
        });
        rowsPro.forEach(producto => {
            if (producto.Producto) {
                producto.Producto = Buffer.from(producto.Producto).toString('base64');
            }
        });
        rowsOfe.forEach(oferta => {
            if (oferta.fotoOferta) {
                oferta.fotoOferta = Buffer.from(oferta.fotoOferta).toString('base64');
            }
        });
        rowsUbi.forEach(ubicacion => {
            if (ubicacion.fotoUbicacion) {
                ubicacion.fotoUbicacion = Buffer.from(ubicacion.fotoUbicacion).toString('base64');
            }
        });

        // Realizar la búsqueda específica
        if (tipo === "barbero") {
            const [rows] = await pool.query(`CALL LL_BUSCAR_BARBERO('${desc}')`);
            barberos = rows.map(barbero => {
                if (barbero.foto) {
                    barbero.foto = Buffer.from(barbero.foto).toString('base64');
                }
                return barbero;
            });
            servicios = rowsSer;
            productos = rowsPro;
            ofertas = rowsOfe;
            ubicaciones = rowsUbi;
            preguntas = rowsPre;
        } else if (tipo === "servicio") {
            const [rows] = await pool.query(`CALL LL_BUSCAR_SERVICIO('${desc}')`);
            servicios = rows.map(servicio => {
                if (servicio.fotoServicio) {
                    servicio.fotoServicio = Buffer.from(servicio.fotoServicio).toString('base64');
                }
                return servicio;
            });
            barberos = rowsBar;
            productos = rowsPro;
            ofertas = rowsOfe;
            ubicaciones = rowsUbi;
            preguntas = rowsPre;
        } else if (tipo === "producto") {
            const [rows] = await pool.query(`CALL LL_BUSCAR_PRODUCTO('${desc}')`);
            productos = rows.map(producto => {
                if (producto.fotoProducto) {
                    producto.fotoProducto = Buffer.from(producto.fotoProducto).toString('base64');
                }
                return producto;
            });
            barberos = rowsBar;
            servicios = rowsSer;
            ofertas = rowsOfe;
            ubicaciones = rowsUbi;
            preguntas = rowsPre;
        } else if (tipo === "oferta") {
            const [rows] = await pool.query(`CALL LL_BUSCAR_OFERTA('${desc}')`);
            ofertas = rows.map(oferta => {
                if (oferta.fotoOferta) {
                    oferta.fotoOferta = Buffer.from(oferta.fotoOferta).toString('base64');
                }
                return oferta;
            });
            barberos = rowsBar;
            productos = rowsPro;
            servicios = rowsSer;
            ubicaciones = rowsUbi;
            preguntas = rowsPre;
        } else if (tipo === "ubicacion") {
            const [rows] = await pool.query(`CALL LL_BUSCAR_UBICACION('${desc}')`);
            ubicaciones = rows.map(ubicacion => {
                if (ubicacion.fotoUbicacion) {
                    ubicacion.fotoUbicacion = Buffer.from(ubicacion.fotoUbicacion).toString('base64');
                }
                return ubicacion;
            });
            barberos = rowsBar;
            productos = rowsPro;
            ofertas = rowsOfe;
            servicios = rowsSer;
            preguntas = rowsPre;
        } else {
            return res.status(400).json({ message: "Tipo de búsqueda no válido" });
        }

        res.render('views.barbero.ejs', { barberos, servicios, productos, ofertas, ubicaciones, preguntas });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Perfil personal del barbero en el cual visualiza su calendario 
export const verCalendario = async (req, res) => {
    const id = req.params['id']

    try {
        const rowsBar = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        const rowsRes = await pool.query(`CALL LL_VER_RESERVA_BARBERO('${id}');`);
        console.log(rowsBar[0][0], rowsRes[0][0]);
        res.render("views.pag_barbero.ejs", { barberos: rowsBar[0][0], reservas: rowsRes[0][0] })
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil personal del barbero en el cual edita su información personal 
export const perfilBarbero = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        res.render("views.perfil_barbero_editar.ejs", { barberos: rows[0][0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil del barbero desde la vista de clientes 
export const verPerfilBarbero = async (req, res) => {
    const id = req.params['id']

    try {
        const rowsBar = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        const rowsCom = await pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`);
        res.render("views.perfil_barbero.ejs", { barberos: rowsBar[0][0], comentarios:rowsCom[0]})
        console.log(rowsBar[0][0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil del barbero desde la vista de admins 
export const verPerfilBarberoAdmin = async (req, res) => {
    const id = req.params['id']

    try {
        const rowsBar = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        const rowsCom = await pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`);
        res.render("views.eliminar_coment.ejs", { barberos: rowsBar[0][0], comentarios:rowsCom[0]})
        console.log(rowsBar[0][0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

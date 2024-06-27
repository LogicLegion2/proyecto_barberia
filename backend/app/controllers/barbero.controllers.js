/**
 * Este es el controlador de barbero
 * @module ctr-barbero
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();


/**
 * Esta funcion sirve para mostrar todos los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarBarbero = async (req, res) => {
    try {
        const [
            [rowsBar], [rowsSer], [rowsPro], [rowsOfe], [rowsUbi], [rowsPre]
        ] = await Promise.all([
            pool.query("CALL LL_VER_BARBERO()"),
            pool.query("CALL LL_VER_SERVICIOS()"),
            pool.query("CALL LL_VER_PRODUCTOS()"),
            pool.query("CALL LL_VER_OFERTAS()"),
            pool.query("CALL LL_VER_UBICACIONES()"),
            pool.query("CALL LL_VER_PREGUNTAS()")
        ]);

        const barberos = rowsBar[0];
        const servicios = rowsSer[0];
        const productos = rowsPro[0];
        const ofertas = rowsOfe[0];
        const ubicaciones = rowsUbi[0];

        barberos.forEach(barbero => {
            if (barbero.foto) {
                try {
                    barbero.img64 = Buffer.from(barbero.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    barbero.img64 = null;
                }
            } else {
                barbero.img64 = null;
            }
        });

        servicios.forEach(servicio => {
            if (servicio.fotoServicio) {
                try {
                    servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    servicio.img64 = null;
                }
            } else {
                servicio.img64 = null;
            }
        });

        productos.forEach(producto => {
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });

        ofertas.forEach(oferta => {
            if (oferta.foto) {
                try {
                    oferta.img64 = Buffer.from(oferta.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    oferta.img64 = null;
                }
            } else {
                oferta.img64 = null;
            }
        });

        ubicaciones.forEach(ubicacion => {
            if (ubicacion.fotoUbicacion) {
                try {
                    ubicacion.img64 = Buffer.from(ubicacion.fotoUbicacion).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    ubicacion.img64 = null;
                }
            } else {
                ubicacion.img64 = null;
            }
        });
        console.log(productos);
        res.status(200).json({ barberos: barberos, servicios: servicios, productos: productos, ofertas: ofertas, ubicaciones: ubicaciones, preguntas: rowsPre });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para mostrar los barberos al admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const listarBarberoAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_BARBERO()");
        const barberos = rows[0];

        barberos.forEach(barbero => {
            if (barbero.foto) {
                try {
                    barbero.img64 = Buffer.from(barbero.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    barbero.img64 = null;
                }
            } else {
                barbero.img64 = null;
            }
        });
        res.status(200).json({ barberos: barberos })
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para buscar barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
 const buscar = async (req, res) => {
    try {
        const { desc, tipo } = req.query;

        if (!desc || !tipo) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda y tipo" });
        }

        // Definir variables para los resultados
        let resultados = {
            barberos: [],
            servicios: [],
            productos: [],
            ofertas: [],
            ubicaciones: [],
            preguntas: []
        };

        // Obtener todos los datos iniciales
        const [
            [rowsBar], [rowsSer], [rowsPro], [rowsOfe], [rowsUbi], [rowsPre]
        ] = await Promise.all([
            pool.query("CALL LL_VER_BARBERO()"),
            pool.query("CALL LL_VER_SERVICIOS()"),
            pool.query("CALL LL_VER_PRODUCTOS()"),
            pool.query("CALL LL_VER_OFERTAS()"),
            pool.query("CALL LL_VER_UBICACIONES()"),
            pool.query("CALL LL_VER_PREGUNTAS()")
        ]);

        // Convertir imágenes a base64
        resultados.barberos = rowsBar;
        resultados.servicios = rowsSer;
        resultados.productos = rowsPro;
        resultados.ofertas = rowsOfe;
        resultados.ubicaciones = rowsUbi;
        resultados.preguntas = rowsPre;

        // Realizar la búsqueda específica
        let query = '';
        switch (tipo) {
            case "barbero":
                query = `CALL LL_BUSCAR_BARBERO('${desc}')`;
                break;
            case "servicio":
                query = `CALL LL_BUSCAR_SERVICIO('${desc}')`;
                break;
            case "producto":
                query = `CALL LL_BUSCAR_PRODUCTO('${desc}')`;
                break;
            case "oferta":
                query = `CALL LL_BUSCAR_OFERTA('${desc}')`;
                break;
            case "ubicacione":
                query = `CALL LL_BUSCAR_UBICACION('${desc}')`;
                break;
            default:
                return res.status(400).json({ message: "Tipo de búsqueda no válido" });
        }

        const [searchResults] = await pool.query(query);
        resultados[tipo + 's'] = searchResults;

        res.json(resultados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Esta funcion sirve para mostrar el calendario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil personal del barbero en el cual visualiza su calendario 
const verCalendario = async (req, res) => {
    const id = req.params['id']

    try {
        const [
            [rowsBar], [rowsRes]
        ] = await Promise.all([
            pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`),
            pool.query(`CALL LL_VER_RESERVA_BARBERO('${id}');`)
        ])
        const reservasFormateadas = rowsRes[0].map(reserva => ({
            ...reserva,
            fecha: reserva.fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
            hora: reserva.hora.split('.')[0] // Formato HH:mm:ss
        }));

        const barberos = rowsBar[0];

        barberos.forEach(barbero => {
            if (barbero.fotoPerfil) {
                try {
                    barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    barbero.img64 = null;
                }
            } else {
                barbero.img64 = null; // O algún valor predeterminado si la imagen no existe
            }
        });
        res.json({ barberos: barberos, reservas: reservasFormateadas });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para ver el perfil del barbero
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil personal del barbero en el cual edita su información personal 
const perfilBarbero = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        const barberos = rows[0][0];

        barberos.forEach(barbero => {
            if (barbero.fotoPerfil) {
                try {
                    barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    barbero.img64 = null;
                }
            } else {
                barbero.img64 = null;
            }
        });
        res.status(200).json({ barberos: barberos})
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para ver los barberos desde la vista del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil del barbero desde la vista de clientes 
const verPerfilBarbero = async (req, res) => {
    const id = req.params['id']
    try {
        const [
            [rowsBar], [rowsCom]
        ] = await Promise.all([
            pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`),
            pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`)
        ])
        const barberos = rowsBar[0];

        barberos.forEach(barbero => {
            if (barbero.fotoPerfil) {
                try {
                    barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    barbero.img64 = null;
                }
            } else {
                barbero.img64 = null;
            }
        });
        res.status(200).json({ barberos: barberos, comentarios:rowsCom[0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para ver los barberos desde la vista del admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil del barbero desde la vista de admins 
const verPerfilBarberoAdmin = async (req, res) => {
    const id = req.params['id']

    try {
        const [
            [rowsBar], [rowsCom]
        ] = await Promise.all [
            pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`),
            pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`)
        ]
        const barberos = rowsBar[0][0];

        barberos.forEach(barbero => {
            if (barbero.fotoPerfil) {
                try {
                    barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    barbero.img64 = null;
                }
            } else {
                barbero.img64 = null;
            }
        });
        res.status(200).json({ barberos: barberos, comentarios:rowsCom[0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

export {listarBarbero, listarBarberoAdmin, buscar, verCalendario, perfilBarbero, verPerfilBarbero, verPerfilBarberoAdmin}


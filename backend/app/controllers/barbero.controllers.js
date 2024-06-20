import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import mysql from "mysql2/promise";
config();

export const listarBarbero = async (req, res) => {
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
        // rowsBar.forEach(barbero => {
        //     if (barbero.foto) {
        //         barbero.foto = Buffer.from(barbero.foto).toString('base64');
        //     }
        // });
        // rowsSer.forEach(servicio => {
        //     if (servicio.fotoServicio) {
        //         servicio.fotoServicio = Buffer.from(servicio.fotoServicio).toString('base64');
        //     }
        // });
        res.status(200).json({ barberos: rowsBar, servicios: rowsSer, productos: rowsPro, ofertas: rowsOfe, ubicaciones: rowsUbi, preguntas: rowsPre });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const listarBarberoAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL LL_VER_BARBERO()");
        // rows.forEach(barbero => {
        //     if (barbero.foto) {
        //         barbero.foto = Buffer.from(barbero.foto).toString('base64');
        //     }
        // });
        res.status(200).json({ barberos: rows[0] })
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

        // Definir variables para los resultados
        let resultados = {
            barberos: [],
            servicios: [],
            productos: [],
            ofertas: [],
            ubicaciones: [],
            preguntas: []
        };

        // Función para convertir imágenes a base64
        const convertirImagenesABase64 = (rows, campoImagen) => {
            return rows.map(row => {
                if (row[campoImagen]) {
                    row[campoImagen] = Buffer.from(row[campoImagen]).toString('base64');
                }
                return row;
            });
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
        resultados.barberos = convertirImagenesABase64(rowsBar, 'foto');
        resultados.servicios = convertirImagenesABase64(rowsSer, 'fotoServicio');
        resultados.productos = convertirImagenesABase64(rowsPro, 'Producto');
        resultados.ofertas = convertirImagenesABase64(rowsOfe, 'fotoOferta');
        resultados.ubicaciones = convertirImagenesABase64(rowsUbi, 'fotoUbicacion');
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
            case "ubicacion":
                query = `CALL LL_BUSCAR_UBICACION('${desc}')`;
                break;
            default:
                return res.status(400).json({ message: "Tipo de búsqueda no válido" });
        }

        // const [rows] = await pool.query(query);
        // resultados[tipo + 's'] = convertirImagenesABase64(rows, tipo === 'barbero' ? 'foto' : `foto${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);

        res.json(resultados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Perfil personal del barbero en el cual visualiza su calendario 
export const verCalendario = async (req, res) => {
    const id = req.params['id']

    try {
        const [
            [rowsBar], [rowsRes]
        ] = await Promise.all([
            pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`),
            pool.query(`CALL LL_VER_RESERVA_BARBERO('${id}');`)
        ])

        res.json( { barberos: rowsBar[0][0], reservas: rowsRes[0][0] })
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil personal del barbero en el cual edita su información personal 
export const perfilBarbero = async (req, res) => {
    const id = req.params['id']

    try {
        const rows = await pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`);
        res.status(200).json({ barberos: rows[0][0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil del barbero desde la vista de clientes 
export const verPerfilBarbero = async (req, res) => {
    const id = req.params['id']
    try {
        const [
            [rowsBar], [rowsCom]
        ] = await Promise.all[
            pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`),
            pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`)
        ]
        res.status(200).json({ barberos: rowsBar[0][0], comentarios:rowsCom[0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

//Perfil del barbero desde la vista de admins 
export const verPerfilBarberoAdmin = async (req, res) => {
    const id = req.params['id']

    try {
        const [
            [rowsBar], [rowsCom]
        ] = await Promise.all [
            pool.query(`CALL LL_VER_PERFIL_BARBERO('${id}');`),
            pool.query(`CALL LL_VER_COMENTARIO_BARBERO('${id}');`)
        ]
        res.status(200).json({ barberos: rowsBar[0][0], comentarios:rowsCom[0]})
    } catch (error) {
        res.status(500).json(error);
    }
}

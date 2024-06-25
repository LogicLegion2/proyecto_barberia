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
        const reservasFormateadas = rowsRes[0].map(reserva => ({
            ...reserva,
            fecha: reserva.fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
            hora: reserva.hora.split('.')[0] // Formato HH:mm:ss
        }));

        res.json({ barberos: rowsBar[0], reservas: reservasFormateadas });
    } catch (error) {
        console.error(error);
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
    console.log({'ID DE PERFIL':id});
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




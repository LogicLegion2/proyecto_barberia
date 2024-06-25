import { config } from "dotenv";
config();

const url = process.env.BACKEND_URL

export const paginaPrincipalAdmin = async (req, res) => {
    try {
        const recurso = url + `/barberos/admin`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.pag_admin.ejs", {
            barberos: data.barberos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const menuAdmin = (req, res) => {
    res.render("views.menu_admin.ejs")
};

export const mostrarPerfilBarbero = (req, res) => {
    res.render("views.eliminar_coment.ejs")
};

export const mostrarProducto = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/productos`;

    if (desc) {
        recurso = url + `/productos/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.productos.ejs", {
            productos: data.productos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const editarProducto = async (req, res) => {
    const id = req.query.id
    res.render("views.editar_producto.ejs", {
        id: id
    })
};

export const crearProducto = async (req, res) => {
    res.render("views.ingresar_producto.ejs")
};

export const mostrarServicio = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/servicios`;

    if (desc) {
        recurso = url + `/servicios/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.servicio.ejs", {
            servicios: data.servicios
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const editarServicio = async (req, res) => {
    const id = req.query.id
    res.render("views.editar_servicio.ejs", {
        id: id
    })
};

export const crearServicio = async (req, res) => {
    res.render("views.nuevo_servicio.ejs")
};

export const mostrarOferta = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/ofertas`;

    if (desc) {
        recurso = url + `/ofertas/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.oferta.ejs", {
            ofertas: data.ofertas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const editarOferta = async (req, res) => {
    const id = req.query.id
    res.render("views.editar_oferta.ejs", {
        id: id
    })
};

export const crearOferta = async (req, res) => {
    res.render("views.nueva_oferta.ejs")
};

export const mostrarUbicacion = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/ubicaciones`;

    if (desc) {
        recurso = url + `/ubicaciones/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.ubicacion.ejs", {
            ubicaciones: data.ubicaciones
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const editarUbicacion = async (req, res) => {
    const id = req.query.id
    res.render("views.editar_ubicacion.ejs", {
        id: id
    })
};

export const crearUbicacion = async (req, res) => {
    res.render("views.ingresar_ubicacion.ejs")
};

export const mostrarPregunta = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/preguntas`;

    if (desc) {
        recurso = url + `/preguntas/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.pregunta.ejs", {
            preguntas: data.preguntas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const editarPregunta = async (req, res) => {
    const id = req.query.id
    res.render("views.editar_pregunta.ejs", {
        id: id
    })
};

export const crearPregunta = async (req, res) => {
    res.render("views.ingresar_pregunta.ejs")
};

export const mostrarUsuario = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/usuarios`;

    if (desc) {
        recurso = url + `/usuarios/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.visualizar_registro.ejs", {
            usuarios: data.usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const crearUsuario = async (req, res) => {
    res.render("views.ingresar_usuario.ejs")
};

export const crearBarbero = async (req, res) => {
    res.render("views.ingresar_barbero.ejs")
};

export const mostrartReservas = async (req, res) => {
    try {
        const recurso = url + `/reservas/admin`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.reservas.ejs", {
            url: url,
            reservas: data.reservas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrartEntregas = async (req, res) => {
    try {
        const recurso = url + `/ventas/entregas/admin`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.entrega_producto.ejs", {
            entregas: data.entregas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarProductosVendidos = async (req, res) => {
    const { desc } = req.query
    let recurso;

    recurso = url + `/productos/vendidos`;

    if (desc) {
        recurso = url + `/ventas/buscar?desc=${desc}`;
    }
    try {
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.prod_vendido.ejs", {
            productos: data.productos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarReservasProductos = async (req, res) => {
    try {
        const recurso = url + `/ventas/productos`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.reservas_productos.ejs", {
            productos: data.productos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarHistorialReservas = async (req, res) => {
    try {
        const recurso = url + `/reservas/historial`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.historial_reservas.ejs", {
            reservas: data.reservas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const perfilAdmin = async (req, res) => {
    const id = req.cookies.id;

    try {
        const recurso = url + `/usuarios/admin/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.perfil_admin.ejs", {
            admins: data.admins
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
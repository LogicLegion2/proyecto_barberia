import { config } from "dotenv";
config();

export const login = (req, res) => {
    res.render("views.iniciar_sesion.ejs")
};

export const paginaPrincipalCliente = (req, res) => {
    res.render("views.barbero.ejs")
};

export const paginaPrincipalBarbero = (req, res) => {
    res.render("views.pag_barbero.ejs")
};

export const paginaPrincipalAdmin = (req, res) => {
    res.render("views.pag_admin.ejs")
};

export const paginaEntregasAdmin = (req, res) => {
    res.render("views.entrega_producto.ejs")
}

export const paginaHistorialCitas = (req, res) => {
    res.render("views.historial_citas.ejs")
}

export const paginaHistorialCompras = (req, res) => {
    res.render("views.historial_compras.ejs")
}

export const paginaAgregarPregunta = (req, res) => {
    res.render("views.ingresar_pregunta.ejs")
}

export const paginaHistorialReservas = (req, res) => {
    res.render("views.historial_reservas.ejs")
}

export const paginaListaFav = (req, res) => {
    res.render("views.lista_fav.ejs")
}

export const paginaOferta = (req, res) => {
    res.render("views.oferta.ejs")
}

export const paginaAdmin = (req, res) => {
    res.render("views.pag_admin.ejs")
}

export const perfilAdmin = (req, res) => {
    res.render("views.perfil_admin.ejs")
}

export const paginaRegistros = (req, res) => {
    res.render("views.visualizar_registro.ejs")
};

export const paginaUbicacion = (req, res) => {
    res.render("views.ubicacion.ejs")
};

export const paginaServicio = (req, res) => {
    res.render("views.servicio.ejs")
};

export const paginaReservas = (req, res) => {
    res.render("views.reservas.ejs")
};

export const paginaReservasProductos = (req, res) => {
    res.render("views.reservas_productos.ejs")
};

export const paginaReservasClientes = (req, res) => {
    res.render("views.reservas_cliente.ejs")
};

export const paginaReservar = (req, res) => {
    res.render("views.reservar.ejs")
};

export const paginaReinstaurarContraseña = (req, res) => {
    res.render("views.reinstaurar_contrasena.ejs")
};

export const paginaRegistrarse = (req, res) => {
    res.render("views.registrarse.ejs")
};

export const paginaReembolso = (req, res) => {
    res.render("views.reembolso.ejs")
};

export const paginaProductos = (req, res) => {
    res.render("views.productos.ejs")
};

export const paginaProductosVendidos = (req, res) => {
    res.render("views.prod_vendido.ejs")
};

export const paginaPreguntas = (req, res) => {
    res.render("views.pregunta.ejs")
};

export const paginaPerfilCliente = (req, res) => {
    res.render("views.perfil_cliente.ejs")
};

export const paginaPerfilBarbero = (req, res) => {
    res.render("views.perfil_barbero.ejs")
};

export const paginaEditarBarbero = (req, res) => {
    res.render("views.perfil_barbero_editar.ejs")
};
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
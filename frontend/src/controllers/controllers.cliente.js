import { config } from "dotenv";
config();

export const paginaPrincipalCliente = (req, res) => {
    res.render("views.barbero.ejs")
};

export const menuCliente = (req, res) => {
    res.render("views.menu_cliente.ejs")
};

export const realizarReserva = (req, res) => {
    res.render("views.reservar.ejs")
};

export const mostrarPerfilBarbero = (req, res) => {
    res.render("views.perfil_barbero.ejs")
};

export const mostrarListaFavoritos = (req, res) => {
    res.render("views.lista_fav.ejs")
};

export const mostrarReserva = (req, res) => {
    res.render("views.reservas_cliente.ejs")
};

export const mostrarEntregas = (req, res) => {
    res.render("views.entrega_productos_cliente.ejs")
};

export const realizarReembolso = (req, res) => {
    res.render("views.reembolso.ejs")
};

export const mostrarHistorialCitas = (req, res) => {
    res.render("views.historial_citas.ejs")
};

export const mostrarHistorialCompras = (req, res) => {
    res.render("views.historial_compras.ejs")
};

export const mostrarCarritoCompras = (req, res) => {
    res.render("views.carrito.ejs")
};

export const perfilCliente = (req, res) => {
    res.render("views.perfil_cliente.ejs")
};

export const realizarCompra = (req, res) => {
    res.render("views.comprar_producto.ejs")
};
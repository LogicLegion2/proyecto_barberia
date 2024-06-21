import { config } from "dotenv";
config();

export const paginaPrincipalAdmin = (req, res) => {
    res.render("views.pag_admin.ejs")
};

export const menuAdmin = (req, res) => {
    res.render("views.menu_admin.ejs")
};

export const mostrarPerfilBarbero = (req, res) => {
    res.render("views.eliminar_coment.ejs")
};

export const mostrarProducto = (req, res) => {
    res.render("views.productos.ejs")
};

export const editarProducto = (req, res) => {
    res.render("views.editar_producto.ejs")
};

export const crearProducto = (req, res) => {
    res.render("views.ingresar_producto.ejs")
};

export const mostrarServicio = (req, res) => {
    res.render("views.servicio.ejs")
};

export const editarServicio = (req, res) => {
    res.render("views.editar_servicio.ejs")
};

export const crearServicio = (req, res) => {
    res.render("views.nuevo_servicio.ejs")
};

export const mostrarOferta = (req, res) => {
    res.render("views.oferta.ejs")
};

export const editarOferta = (req, res) => {
    res.render("views.editar_oferta.ejs")
};

export const crearOferta = (req, res) => {
    res.render("views.nueva_oferta.ejs")
};

export const mostrarUbicacion = (req, res) => {
    res.render("views.ubicacion.ejs")
};

export const editarUbicacion = (req, res) => {
    res.render("views.editar_ubicacion.ejs")
};

export const crearUbicacion = (req, res) => {
    res.render("views.ingresar_ubicacion.ejs")
};

export const mostrarPregunta = (req, res) => {
    res.render("views.pregunta.ejs")
};

export const editarPregunta = (req, res) => {
    res.render("views.editar_pregunta.ejs")
};

export const crearPregunta = (req, res) => {
    res.render("views.ingresar_pregunta.ejs")
};

export const mostrarUsuario = (req, res) => {
    res.render("views.visualizar_registro.ejs")
};

export const crearUsuario = (req, res) => {
    res.render("views.ingresar_usuario.ejs")
};

export const crearBarbero = (req, res) => {
    res.render("views.ingresar_barbero.ejs")
};

export const mostrartReservas = (req, res) => {
    res.render("views.reservas.ejs")
};

export const mostrartEntregas = (req, res) => {
    res.render("views.entrega_producto.ejs")
};

export const mostrarProductosVendidos = (req, res) => {
    res.render("views.prod_vendido.ejs")
};

export const mostrarReservasProductos = (req, res) => {
    res.render("views.reservas_productos.ejs")
};

export const mostrarHistorialReservas = (req, res) => {
    res.render("views.historial_reservas.ejs")
};

export const perfilAdmin = (req, res) => {
    res.render("views.perfil_admin.ejs")
};
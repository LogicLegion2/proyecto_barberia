import { config } from "dotenv";
config();

const url = process.env.BACKEND_URL

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(new Blob([blob]));
    });
};

export const paginaPrincipalCliente = async (req, res) => {
    try {
        const recurso = url + "/barberos";
        const response = await fetch(recurso);
        const data = await response.json();

        const barberosConImagenes = await Promise.all(data.barberos.map(async barbero => {
            if (barbero.foto) {
                const base64String = await blobToBase64(barbero.foto);
                console.log(base64String);
                barbero.foto = `data:image/jpeg;base64,${base64String}`;
            }
            return barbero;
        }));

        res.render("views.barbero.ejs", {
            barberos: barberosConImagenes,
            servicios: data.servicios,
            productos: data.productos,
            ofertas: data.ofertas,
            ubicaciones: data.ubicaciones,
            preguntas: data.preguntas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
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
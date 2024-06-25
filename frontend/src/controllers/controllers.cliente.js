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
    const { desc, tipo} = req.query
    let recurso;

    recurso = url + `/barberos`;

    if (desc && tipo) {
        recurso = url + `/barberos/buscar?desc=${desc}&tipo=${tipo}`;
    }

    try {
        const response = await fetch(recurso);
        const data = await response.json();

        // const barberosConImagenes = await Promise.all(data.barberos.map(async barbero => {
        //     if (barbero.foto) {
        //         const base64String = await blobToBase64(barbero.foto);
        //         console.log(base64String);
        //         barbero.foto = `data:image/jpeg;base64,${base64String}`;
        //     }
        //     return barbero;
        // }));

        res.render("views.barbero.ejs", {
            barberos: data.barberos,
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

export const mostrarListaFavoritos = async (req, res) => {
    const id = req.cookies.id;

    try {
        const recurso = url + `/favoritos/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.lista_fav.ejs", {
            favoritos: data.favoritos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarReserva = async (req, res) => {
    const id = req.cookies.id;

    if (!id) {
        Swal.fire({
            icon: 'error',
            title: `<h5 style='color:white; font-family: "Aleo", serif;'>El id del usuario no ha sido proporcionado</h5>`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
    }
    try {
        const recurso = url + `/reservas/listar/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();

        res.render("views.reservas_cliente.ejs", {
            reservas: data.reservas,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarEntregas = async (req, res) => {
    const id = req.cookies.id;

    try {
        const recurso = url + `/ventas/entregas/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();

        res.render("views.entrega_productos_cliente.ejs", {
            entregas: data.entregas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const realizarReembolso = (req, res) => {
    res.render("views.reembolso.ejs")
};

export const mostrarHistorialCitas = async (req, res) => {
    const id = req.cookies.id;

    if (!id) {
        Swal.fire({
            icon: 'error',
            title: `<h5 style='color:white; font-family: "Aleo", serif;'>El id del usuario no ha sido proporcionado</h5>`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
    }
    try {
        const recurso = url + `/reservas/historial/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();

        res.render("views.historial_citas.ejs", {
            reservas: data.reservas,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarHistorialCompras = async (req, res) => {
    const id = req.cookies.id;

    if (!id) {
        Swal.fire({
            icon: 'error',
            title: `<h5 style='color:white; font-family: "Aleo", serif;'>El id del usuario no ha sido proporcionado</h5>`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'bg-alert',
                content: 'text-alert'
            }
        });
    }
    try {
        const recurso = url + `/ventas/historial/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();

        res.render("views.historial_compras.ejs", {
            compras: data.compras,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const mostrarCarritoCompras = async (req, res) => {
    const id = req.cookies.id;

    try {
        const recurso = url + `/ventas/carrito/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();

        res.render("views.carrito.ejs", {
            productos: data.productos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const perfilCliente = async (req, res) => {
    const id = req.cookies.id;

    try {
        const recurso = url + `/usuarios/cliente/${id}`;
        const response = await fetch(recurso);
        const data = await response.json();
        res.render("views.perfil_cliente.ejs", {
            clientes: data.clientes
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const realizarCompra = (req, res) => {
    res.render("views.comprar_producto.ejs")
};
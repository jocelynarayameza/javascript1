class Libro{
    constructor (id, nombre, autor, precio, paginas){
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.precio = precio;
        this.paginas = paginas;
        this.disponible = true;
    }  
    descripcion() {
        return "ID: " + this.id + "\tNombre: " + this.nombre + "\tAutor: " + this.autor + "\tPrecio: $" + this.precio + "\tPáginas: " + this.paginas;
    }
}

const l1 = new Libro(1, "libro1", "autor1", 10000, "300 páginas");
const l2 = new Libro(2, "libro2", "autor2", 12000, "370 páginas");
const l3 = new Libro(3, "libro3", "autor3", 9900, "200 páginas");
const l4 = new Libro(4, "libro4", "autor4", 8000, "190 páginas");
const l5 = new Libro(5, "libro5", "autor5", 13000, "350 páginas");
const l6 = new Libro(6, "libro6", "autor6", 14000, "400 páginas");

class CarritoDeCompras {
    constructor() {
        this.items = [];
    }

    agregarLibro(libro) {
        this.items.push(libro);
    }

    calcularTotal() {
        let total = 0;
        for (const libro of this.items) {
            total += libro.precio;
        }
        return total;
    }

    mostrarCarrito() {
        let mensaje = "Carrito de Compras:\n";
        for (const libro of this.items) {
            mensaje += libro.descripcion() + "\n";
        }
        mensaje += "Total: $" + this.calcularTotal();
        alert(mensaje);
    }
}

const carrito = new CarritoDeCompras();

alert("Productos disponibles:\n" +
      l1.descripcion() + "\n" +
      l2.descripcion() + "\n" +
      l3.descripcion() + "\n" +
      l4.descripcion() + "\n" +
      l5.descripcion() + "\n" +
      l6.descripcion());

while (true) {
    const libroId = parseInt(prompt("Ingresa el ID del libro que deseas agregar al carrito (0 para finalizar):"));

    if (libroId === 0) {
        break;
    }

    let libroSeleccionado;

    switch (libroId) {
        case 1:
            libroSeleccionado = l1;
            break;
        case 2:
            libroSeleccionado = l2;
            break;
        case 3:
            libroSeleccionado = l3;
            break;
        case 4:
            libroSeleccionado = l4;
            break;
        case 5:
            libroSeleccionado = l5;
            break;
        case 6:
            libroSeleccionado = l6;
            break;
        default:
            alert("ID de libro no válido.");
            continue;
    }

    carrito.agregarLibro(libroSeleccionado);
    alert("Libro agregado al carrito.");
}

carrito.mostrarCarrito()
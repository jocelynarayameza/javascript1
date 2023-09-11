class Libro{
    constructor (id, nombre, autor, precio, paginas, img){
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.precio = precio;
        this.paginas = paginas;
        this.img = img;
        this.disponible = true;
    }  
    descripcion() {
        return `
        <div class="card" id="${this.id}" style="width: 18rem;">
            <img src="${this.img} " class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.nombre} </h5>
              <p class="card-text">${this.autor}</p>
              <p class="card-text">${this.paginas}</p>
              <p class="card-text">$${this.precio}</p>
              <a href="#" class="btn btn-primary" id="add-${this.id}" >Agregar al carrito</a>
            </div>
          </div>`
    }
    descripcioncarrito() {
        return `
        <div class="d-flex">
            <h5 class="card-title">${this.nombre} </h5>
            <button type="button" class="btn-close" id="del-${this.id}"  aria-label="Cancelar"></button>
        </div>
        <p>$${this.precio} </p>`
    }
}

const l1 = new Libro(1, "Dresde", "Sinclair McKay", 10000, "376 páginas", "https://images.cdn3.buscalibre.com/fit-in/360x360/3a/41/3a412e50e512f88c3d14e43f8d57ff1e.jpg");
const l2 = new Libro(2, "Si ahora no, ¿cuándo?", "Primo Levi", 12000, "384 páginas", "https://images.cdn3.buscalibre.com/fit-in/360x360/47/cb/47cb75e99b5dd2f30d8e77448fd78b75.jpg");
const l3 = new Libro(3, "Sin novedad en el frente", "Erick Maria Remarque", 9900, "232 páginas", "https://images.cdn3.buscalibre.com/fit-in/360x360/2f/5a/2f5a03a2da31ad73fdce2a1f730dd9a4.jpg");
const l4 = new Libro(4, "The turn of the screw", "Henry James", 8000, "126 páginas", "https://images.cdn3.buscalibre.com/fit-in/360x360/c1/f2/c1f28c6eeaa92aaf925d14816c705362.jpg");
const l5 = new Libro(5, "Oliver Twist", "Charles Dickens", 14000, "445 páginas", "https://images.cdn3.buscalibre.com/fit-in/360x360/39/c6/39c6da12c35ade87b4f7832c0082c82b.jpg");
const l6 = new Libro(6, "Dagón", "H. P. Lovecraft", 13000, "157 páginas", "https://images.cdn3.buscalibre.com/fit-in/360x360/3d/8c/3d8c4e9c74be2ea57ed2f5ce8e00dd9a.jpg");


let selectedbooks = [];


document.addEventListener("DOMContentLoaded", function(event) {
    let contenedor_books = document.getElementById("contenedor_libros")
    const books = [l1, l2, l3, l4, l5, l6]
    books.forEach(book => {
        contenedor_books.innerHTML += book.descripcion()
    })
    books.forEach(book => {
        const btn_add = document.getElementById(`add-${book.id}`)

        btn_add.addEventListener("click",()=>{
        if (!selectedbooks.find((element) => element === book)) 
        {selectedbooks.push(book)
            localStorage.setItem("selectedbooks", JSON.stringify(selectedbooks))
            actualizarcarrito()
        }
        alert("Producto agregado al carrito")
        
    })
    })
});

const actualizarcarrito = function(event) {
    let contenedor_carrito = document.getElementById("contenedor_carrito")
    let listaJSON = localStorage.getItem("selectedbooks")
    let listaCarritoJS = JSON.parse(listaJSON)
    let books = []
    listaCarritoJS.forEach(book => {
        let newBook = new Libro(book.id, book.nombre, book.autor, book.precio, book.paginas, book.img)
        books.push(newBook)
    })

    contenedor_carrito.innerHTML=""
    books.forEach(book => {
        contenedor_carrito.innerHTML += book.descripcioncarrito()
    })
    
    books.forEach(book => {
        
        const btn_del = document.getElementById(`del-${book.id}`)

        btn_del.addEventListener("click",()=>{
            let indice = books.findIndex(element => element.id == book.id)
            books.splice(indice,1)
            localStorage.setItem("selectedbooks", JSON.stringify(books))
            actualizarcarrito()
    })
    })
};
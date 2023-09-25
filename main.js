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

let selectedbooks = [];
async function fetchBooks() {
    const rawData = await fetch('books.json')
    const bookList = await rawData.json()
    result = []
    bookList.forEach(rawBook => {
        result.push(new Libro(rawBook.id, rawBook.nombre, rawBook.autor, rawBook.precio, rawBook.paginas, rawBook.img))
    })
    return result
}

document.addEventListener("DOMContentLoaded", async function(event) {
    let contenedor_books = document.getElementById("contenedor_libros")
    const books = await fetchBooks()
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
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #59b345, #dbcaaf)",
              },
            position: "center", 
            }).showToast();
        
    })
    })
    actualizarcarrito()

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
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #d82929, #dbcaaf)",
                  },
                position: "center", 
                }).showToast();
    })
    })
};
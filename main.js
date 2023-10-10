class Book{
    constructor (id, name, author, price, pages, img){
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;
        this.pages = pages;
        this.img = img;
        this.available = true;
    }  
    description() {
        return `
        <div class="card" id="${this.id}" style="width: 18rem;">
            <img src="${this.img} " class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.name} </h5>
              <p class="card-text">${this.author}</p>
              <p class="card-text">${this.pages}</p>
              <p class="card-text">$${this.price}</p>
              <a href="#" class="btn btn-primary" id="add-${this.id}" >Agregar al carrito</a>
            </div>
          </div>`
    }
    cartdescription(quantity) {
        return `
        <div class="d-flex">
            <h5 class="card-title-cart">${this.name} </h5>
            <label for="quantity">Cantidad=</label>
            <input type="number" id="quantity" name="quantity" min="1" value="${quantity}" onchange="quantityUpdate(this.value, ${this.id})" >
            <button type="button" class="btn-close" id="del-${this.id}"  aria-label="Cancelar"></button>
        </div>
        <p>$${this.price*quantity} </p>`
    }
}

let selectedbooks = [];
async function fetchBooks() {
    const rawData = await fetch('books.json')
    const bookList = await rawData.json()
    result = []
    bookList.forEach(rawBook => {
        result.push(new Book(rawBook.id, rawBook.name, rawBook.author, rawBook.price, rawBook.pages, rawBook.img))
    })
    return result
}

document.addEventListener("DOMContentLoaded", async function(event) {
    let books_container = document.getElementById("books_container")
    const books = await fetchBooks()
    books.forEach(book => {
        books_container.innerHTML += book.description()
    })
    
    books.forEach(book => {
        const btn_add = document.getElementById(`add-${book.id}`)

        btn_add.addEventListener("click",()=>{
            let storedBookIndex = selectedbooks.findIndex(element => element.bookInfo.id === book.id)

            if(storedBookIndex === -1) {
                selectedbooks.push({
                    bookInfo: book, quantity: 1
                })
            } else {
                selectedbooks[storedBookIndex].quantity += 1
            }
            
            localStorage.setItem("selectedbooks", JSON.stringify(selectedbooks))
            console.log(selectedbooks)
            updateCart()
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
    updateCart()

});

const clearCart = function() {
    selectedbooks = []
    localStorage.setItem("selectedbooks", JSON.stringify(selectedbooks))
    updateCart()
}

const quantityUpdate = function(quantity, bookId) {
    selectedbooks.forEach((book) => {
        if(book.bookInfo.id === bookId)
            book.quantity = quantity
    })
    console.log(selectedbooks)
    localStorage.setItem("selectedbooks", JSON.stringify(selectedbooks))
    updateCart()
}


const updateCart = function(event) {
    let cart_container = document.getElementById("cart_container")
    let listJSON = localStorage.getItem("selectedbooks")
    let cartListJS = JSON.parse(listJSON)
    selectedbooks = []
    cartListJS.forEach(book => {
        let newBook = new Book(book.bookInfo.id, book.bookInfo.name, book.bookInfo.author, book.bookInfo.price, book.bookInfo.pages, book.bookInfo.img)
        selectedbooks.push({bookInfo: newBook, quantity: book.quantity})
    })

    cart_container.innerHTML=""
    selectedbooks.forEach(book => {
        cart_container.innerHTML += book.bookInfo.cartdescription(parseInt(book.quantity))
    })
    
    selectedbooks.forEach(book => {
        
        const btn_del = document.getElementById(`del-${book.bookInfo.id}`)

        btn_del.addEventListener("click",()=>{
            let index = selectedbooks.findIndex(element => element.bookInfo.id == book.bookInfo.id)
            selectedbooks.splice(index,1)
            localStorage.setItem("selectedbooks", JSON.stringify(selectedbooks))
            updateCart()
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
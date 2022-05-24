// Productos
const publicarDatos = async ()=>{
    try{
        let datos = await fetch("inventario.json");
        let response = await datos.json();
        let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
        if(listaProductos = []){
            listaProductos = response;
            localStorage.setItem("productos",JSON.stringify(listaProductos));
        }
        let prods = JSON.parse(localStorage.getItem("productos"));
        prods.forEach(el => {
            /* Inyectar html de las cards */
            let nodo = document.createElement("div");
            nodo.innerHTML = `
                <img src="${el.img}" alt="${el.nombre}" class="productos__cards--img">
                <div class="productos__cards--text">
                    <h3>${el.nombre}</h3>
                    <p class="product-price">$${el.precio}</p>
                    <button class="addToCart btn-ppal">Add to Cart</button>
                </div>
            `
            nodo.className = "productos__cards--card col";
            nodo.setAttribute('id', el.id);
            document.getElementById("cards").appendChild(nodo);
        })
    } catch(error){
        console.log(error);
    }
}

// Carrito
const carrito = document.querySelector(".carrito");
const carritoOverlay = document.querySelector(".carrito__overlay");
const closeBtn = document.querySelector("#close-btn");
const addToCart = document.getElementsByClassName("addToCart");
const cantidadProds = document.querySelector(".cart-quantity");
const comprarBtn = document.querySelector("#comprar");

/* Evento abrir y cerrar carrito desde imagen carrito */
carrito.addEventListener("click", ()=>{
    if(carritoOverlay.classList.contains("open")){
        carritoOverlay.classList.remove("open");
    }else{
        carritoOverlay.classList.add("open");
    }
})
/* Evento cerrar carrito desde cruz y clickeando fuera del aside */
closeBtn.addEventListener("click",()=>{
    carritoOverlay.classList.remove("open");
})
carritoOverlay.addEventListener("click", (e)=>{
    if(e.target.classList.contains("carrito__overlay")){
        carritoOverlay.classList.remove("open");
    }
})
/* Asignar a cada boton la funcion agregarCarrito */
for (let i=0; i < addToCart.length; i++) {
    let boton = addToCart[i];
    boton.addEventListener("click", agregarCarrito);
}
/* Agregar al carrito */
function agregarCarrito(e) {
    let boton = e.target;
    let cartItem = boton.parentElement.parentElement;
    let prodId = cartItem.getAttribute("id");
    let prodName = cartItem.querySelector("h3").innerText;
    let price = cartItem.querySelector(".product-price").innerText;
    let imageSrc = cartItem.querySelector(".productos__cards--img").src;
    agregarElem(prodId, prodName, price, imageSrc);
}
function agregarElem(prodId, prodName, price, imageSrc){
    let productRow = document.createElement("div");
    let productRows = document.querySelector(".product-rows");
    let prodArray = document.getElementsByClassName("product-row");
    id = `id:${prodId}`
    //Verificar si el producto ya esta en el carrito
    for(let i=0; i < prodArray.length; i++) {
        if(prodArray[i].getAttribute("id") == id) {
            alert("Este producto ya existe en el carrito");
            return;
        }
    }
    //Inyectar el html al carrito
    let cartRowItem = `
        <div class="product-row" id="id:${prodId}">
            <img class="carrito__modal__item--img" src="${imageSrc}">
            <span class="carrito__modal__item--text">${prodName}</span>
            <span class="cart-price carrito__modal__item--price">${price}</span>
            <input class="carrito__modal__item--cantidad product-quantity" type="number" value="1" min="1">
            <button class="carrito__modal__item--borrar remove-btn">Borrar</button>
        </div>
    `
    productRow.innerHTML = cartRowItem;
    productRows.append(productRow);
    productRow.querySelector(".remove-btn").addEventListener("click", removeItem);
    productRow.querySelector(".product-quantity").addEventListener("change", cambiarCantidad)
    updatePrice();

}
/* Eliminar elementos */
function removeItem(e) {
    let btnCliked = e.target;
    btnCliked.parentElement.parentElement.remove();
    updatePrice();
}
/* Cambiar cantidad */
function cambiarCantidad(e){
    let cantidad = e.target.value;
    if(isNaN(cantidad) || cantidad <= 0) {
        cantidad = 1;
    }
    updatePrice();
}
/* Actualizar el total */
function updatePrice() {
    let total = 0;
    let productRows = document.getElementsByClassName("product-row");
    for(const producto of productRows) {
        let price = parseFloat(producto.querySelector(".cart-price").innerText.replace("$",""));
        let cantidad = producto.querySelector(".product-quantity").value;
        total += price * cantidad;
    }
    document.querySelector(".total-price").innerText = "$" + total;
    document.querySelector(".cart-quantity").textContent = productRows.length;
    if ((productRows.length > 0)){
        cantidadProds.classList.remove("hidden");
    }else{
        cantidadProds.classList.add("hidden");
    }
}
/* Comprar */
comprarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    comprar();
    window.open("cart.html");
})
const comprar = () =>{
    let carritoProds = document.querySelectorAll(".product-row");
    let cantidadProds = document.querySelectorAll(".product-quantity");
    const carritoVenta = [];
    /* Resolver */
    for (let i=0; i < cantidadProds.length; i++){
        let id = carritoProds[i].getAttribute("id");
        let cantidad = cantidadProds[i].value;
        let ele = {
            id: id,
            cant: cantidad
        }
        carritoVenta.push(ele)
    }
    localStorage.setItem("carrito", JSON.stringify(carritoVenta));
}
updatePrice()
publicarDatos();
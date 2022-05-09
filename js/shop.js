prods = JSON.parse(localStorage.getItem("productos"));
// Productos
prods.forEach(el => {
    /* Inyectar html de las cards */
    let nodo = document.createElement("div");
    nodo.innerHTML = `
        <img src="${el.img}" alt="${el.nombre}" class="productos__cards--img">
        <div class="productos__cards--text">
            <h3>${el.nombre}</h3>
            <p class="product-price">$${el.precio}</p>
            <button class="addToCart">Add to Cart</button>
        </div>
    `
    nodo.className = "productos__cards--card col";
    nodo.setAttribute('id', el.id);
    document.getElementById("cards").appendChild(nodo);
})
// Carrito
const carrito = document.querySelector(".carrito");
const carritoOverlay = document.querySelector(".carrito__overlay");
const closeBtn = document.querySelector("#close-btn");
const addToCart = document.getElementsByClassName("addToCart");
const productRows = document.getElementsByClassName("product-row");
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

    //Verificar si el producto ya esta en el carrito
    for(let i=0; i < prodArray.length; i++) {
        if(prodArray[i].getAttribute("id")== prodId) {
            alert("Este producto ya existe en el carrito");
            return;
        }
    }
    //Inyectar el html al carrito
    let cartRowItem = `
        <div class="product-row" id="${prodId}">
            <img class="carrito__modal__item--img" src="${imageSrc}">
            <span>${prodName}</span>
            <span class="cart-price">${price}</span>
            <input class="product-quantity" type="number" value="1">
            <button class="remove-btn">Borrar</button>
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
    for(const producto of productRows) {
        let price = parseFloat(producto.querySelector(".cart-price").innerText.replace("$",""));
        let cantidad = producto.querySelector(".product-quantity").value;
        total += price * cantidad;
    }
    document.querySelector(".total-price").innerText = "$" + total;
    document.querySelector(".cart-quantity").textContent = productRows.length;
}

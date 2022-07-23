let carrito = JSON.parse(localStorage.getItem("carrito"));
const finalizarCompraBtn = document.getElementById("finalizarCompra");
finalizarCompraBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    comprarProductos();
})
// Buscar numeros dentro de un string y devolverlos en un array 
const buscarId = () =>{
    let regex = /(\d+)/g;
    let art = [];
    carrito.forEach(el => {
        art.push(parseInt(el.id.match(regex)));
    })
    return art;
}
// Buscar productos segun ID y crear tabla con detalles producto, precio, cantidad y total
const obtenerProductos = () =>{
    let storage = JSON.parse(localStorage.getItem("productos"));
    let ids = buscarId();
    let acumulador = 0;
    for (let i=0; i < ids.length; i++){
        for (let g=0; g < storage.length; g++){
            if (ids[i] === storage[g].id){
                let nodo = document.createElement("div");
                nodo.innerHTML = `
                    <img src="${storage[g].img}" alt="${storage[g].nombre}" class="compra__contenedor__card--img">
                    <h3>${storage[g].nombre}</h3>
                    <p class="product-price">$${storage[g].precio}</p>
                    <p>x${carrito[i].cant}</p>
                    <p>$${(storage[g].precio)*(carrito[i].cant)}</p>
                `
                nodo.className = "compra__contenedor__card col-12";
                document.getElementById("carro").appendChild(nodo);
                acumulador = acumulador + (storage[g].precio)*(carrito[i].cant);
            }
        }
    }
    let nodo = document.createElement("div");
                nodo.innerHTML = `
                    <div class="compra__contenedor__total--text"><h3><strong>TOTAL</strong></h3></div>
                    <div class="compra__contenedor__total--number"><h3><strong>$${acumulador}</strong></h3></div>
                `
                nodo.className = "compra__contenedor__total col-12";
                document.getElementById("carro").appendChild(nodo);
}
const comprarProductos = () => {
    Swal.fire({
        icon: 'success',
        title: 'Thank you for your purchase',
        text: 'We will send you an email with the information of your order'
    }).then(() => {
        return (window.location.href = "/delivery.html");
    });
}
obtenerProductos(); 
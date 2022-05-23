let carrito = JSON.parse(localStorage.getItem("carrito"));
// Buscar numeros dentro de un string y devolverlos en un array 
const buscarId = () =>{
    let regex = /(\d+)/g;
    let art = [];
    carrito.forEach(el => {
        art.push(parseInt(el.id.match(regex)));
    })
    console.log(art);
    return art;
}
// Buscar productos segun ID
const obtenerProductos = () =>{
    let storage = JSON.parse(localStorage.getItem("productos"));
    let ids = buscarId();
    for (let i=0; i < ids.length; i++){
        for (let g=0; g < storage.length; g++){
            if (ids[i] === storage[g].id){
                let nodo = document.createElement("div");
                nodo.innerHTML = `
                    <img src="${storage[g].img}" alt="${storage[g].nombre}" class="productos__cards--img">
                    <div class="productos__cards--text">
                        <h3>${storage[g].nombre}</h3>
                        <p class="product-price">$${storage[g].precio}</p>
                    </div>
                `
                nodo.className = "productos__cards--card col";
                document.getElementById("carro").appendChild(nodo);
            }
        }
    }
}
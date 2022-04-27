prods = JSON.parse(localStorage.getItem("productos"));
prods.forEach(el => {
    let nodo = document.createElement("div");
    nodo.innerHTML = `
        <img src="${el.img}" alt="${el.nombre}" class="productos__cards--img">
        <div class="productos__cards--text">
            <h3>${el.nombre}</h3>
            <p>Price $${el.precio}</p>
            <button>Add to Cart</button>
        </div>
    `
    nodo.className = "productos__cards--card col";
    document.getElementById("cards").appendChild(nodo);
})
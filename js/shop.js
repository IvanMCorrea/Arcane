prods = JSON.parse(localStorage.getItem("productos"));
prods.forEach(el => {
    let nodo = document.createElement("div");
    nodo.innerHTML = `
        <img src="${el.img}" alt="${el.nombre}" class="proyectos__cards--img">
        <h3>${el.nombre}</h3>
        <p>Price $${el.precio}</p>
    `
    nodo.className = "proyectos__cards--card col";
    document.getElementById("cards").appendChild(nodo);
})
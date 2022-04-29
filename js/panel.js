const verificarStorage = () => {
    let lista = [];
    if(localStorage.getItem("productos") != null) {
        lista = JSON.parse(localStorage.getItem("productos"));
        return lista;
    }
}
/* Tabla de productos y eliminar producto (En proceso)

const eliminarProductoPanel = (item) =>{
    let prods = verificarStorage();
    let index = prods.indexOf(item);
    //si existe lo borra
    if (index != -1) {
        prods.splice(index, 1);
        localStorage.setItem("productos",JSON.stringify(prods));
    }
    location.reload();
}

    const imprimirDatos = () => {
    if (verificarStorage() != undefined) {
        verificarStorage().forEach(obj => {
            document.getElementById("tabla").innerHTML += `
                <tr>
                    <td>${obj.nombre}</td>
                    <td>${obj.precio}</td>
                    <td>${obj.rutaImg}</td>
                    <td><button onclick="eliminarProductoPanel(${obj.nombre})">X</button></td>
                </tr>
            `
        })
    }
}
imprimirDatos(); */
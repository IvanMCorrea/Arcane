const verificarStorage = () => {
    let lista = [];
    if(localStorage.getItem("productos") != null) {
        lista = JSON.parse(localStorage.getItem("productos"));
        return lista;
    }
}
/* Tabla de productos */
const eliminarProductoPanel = (id) =>{
    let prods = verificarStorage();
    let listaFiltrada = prods.filter(obj => obj.id != id);
    localStorage.setItem("productos", JSON.stringify(listaFiltrada));
    location.reload();
}
const agregarStockPanel = (id) =>{
    const listaModificada = verificarStorage();
    let index = listaModificada.findIndex(obj => obj.id === id);
    console.log(listaModificada);
    if (index != -1){
        let prod = listaModificada[index].stock;
        prod++;
        listaModificada[index].stock = prod;
    }
    localStorage.setItem("productos", JSON.stringify(listaModificada));
    location.reload();
}
const restarStockPanel = (id) =>{
    const listaModificada = verificarStorage();
    let index = listaModificada.findIndex(obj => obj.id === id);
    console.log(listaModificada);
    if ((index != -1) && (listaModificada[index].stock > 0)){
        let prod = listaModificada[index].stock;
        prod--;
        listaModificada[index].stock = prod;
    }else{
        alert("El stock es 0, si quiere eliminar el producto seleccione la X")
    }
    localStorage.setItem("productos", JSON.stringify(listaModificada));
    location.reload();
}
const imprimirDatos = () => {
    if (verificarStorage() != undefined) {
        /*  */
        verificarStorage().forEach(obj => {
            document.getElementById("tabla").innerHTML += `
                <tr>
                    <td>${obj.id}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.precio}</td>
                    <td>${obj.img}</td>
                    <td>${obj.stock}</td>
                    <td><button onclick="eliminarProductoPanel(${obj.id})">X</button></td>
                    <td>
                        <button onclick="restarStockPanel(${obj.id})">-</button>
                        <button onclick="agregarStockPanel(${obj.id})">+</button>
                    </td>
                </tr>
            `
        })
    }
}
imprimirDatos();
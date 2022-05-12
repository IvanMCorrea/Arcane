// Inicio Sesión
class NewUser{
    constructor(user, pass, carrito){
        this.user = user;
        this.pass = pass;
        this.carrito = carrito;
    }
}
//              - Agregar Usuario
const newUsers = () => {
    alert("Cree cuenta nueva");
    let user = prompt("Ingrese nombre de usuario");
    let pass = prompt("Ingrese contraseña");
    alert("Cuenta nueva creada!");
    let carrito = [];
    let user1 = new NewUser(user,pass,carrito);
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(user1);
    localStorage.setItem("usuarios",JSON.stringify(listaUsuarios));
    console.log(listaUsuarios);
}
//              - Iniciar sesión
function login(){
    let intentos = 3;
    let ingreso = false;
    alert("Inicie Sesión");
    let field1 = prompt("Ingrese nombre de usuario");
    let field2 = prompt("Ingrese contraseña");
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    /*  Utilizar LocalStorage para ingresar (En proceso)  */
    while (intentos > 0 ) {
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (field1 == listaUsuarios[i].user && field2 == listaUsuarios[i].pass) {
                ingreso = true;
            }
        }
        if(ingreso == true){
            alert("Bienvenido/a");
            console.log("Bienvenido/a");
            intentos = 0;
        }else{
            alert(`Datos incorrectos, le quedan ${intentos} intentos`);
            field1 = prompt("Ingrese nombre de usuario");
            field2 = prompt("Ingrese contraseña");
            intentos--;
        }
    }
}
// Llamar función para Agregar Usuarios mediante link
let crearCuenta = document.querySelector("#cuentaNueva");
crearCuenta.addEventListener("click", (e)=>{
    e.preventDefault();
    newUsers();
})
// Llamar función para Iniciar Sesión mediante link
let ingresarCuenta = document.querySelector("#ingresarCuenta");
ingresarCuenta.addEventListener("click", (e)=>{
    e.preventDefault();
/*     //login();
    Swal.fire({
        title: 'Login Form',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">`,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: () => {
            const login = document.querySelector('#login').value
            const password = document.querySelector('#password').value
            if (!login || !password) {
                showValidationMessage(`Please enter login and password`)
            }
            return { login: login, password: password }
        }
    })
        .then((result) => {
            let login = result.value.login;
            let password = result.value.password;
            let intentos = 3;
            let ingreso = false;
            let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (!login || !password) {
                showValidationMessage(`Please enter login and password`)
            }else{
                for (let i = 0; i < listaUsuarios.length; i++) {
                    if (login == listaUsuarios[i].user && password == listaUsuarios[i].pass) {
                        ingreso = true;
                    }
                }
                if(ingreso == true){
                    console.log("Bienvenido/a");
                    intentos = 0;
                }else{
                    console.log(`Datos incorrectos`);
                }
            }
        })
}) */
    (async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Multiple inputs',
            html:
            `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            focusConfirm: false,
            preConfirm: () => {
                const login = document.querySelector('#login').value;
                const password = document.querySelector('#password').value;
                let ingreso = false;
                obtenerUsuarios();
                let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                console.log(listaUsuarios);
                if (!login || !password) {
                    alert(`Please enter login and password`)
                }else{
                    for (let i = 0; i < listaUsuarios.length; i++) {
                        if (login == listaUsuarios[i].nombre && password == listaUsuarios[i].pass) {
                            ingreso = true;
                        }
                    }
                    if(ingreso == true){
                        console.log("Bienvenido/a");
                    }else{
                        console.log(`Datos incorrectos`);
                    }
                }    
                return [
                    document.getElementById('login').value,
                    document.getElementById('password').value
                ]
            }
        })
        if (formValues) {
            console.log(formValues);
            Swal.fire(JSON.stringify(formValues))
        }   
    })()
})
// Productos
class Producto {
    constructor(id,nombre,precio,img,stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.stock = stock;
    }
//          - Descuento 10%
    descuento10(){
        if(this.precio >2000) {
            this.precio = this.precio * 0.9;
            return this.precio;
        }
    }
//          - Detalle del producto
    detalleProd() {
        let resumen = `El nombre del producto es ${this.nombre} y el valor es $${this.precio}`;
        return resumen;
    };
}
// Console log lista productos
const listaProductos = () => {
    let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
    for (const {nombre: n, precio: p} of listaProductos) {
        console.log(`Nombre de Producto: ${n}, Precio: $${p}`);
    }
}
// Copiar arreglo
const copiarArreglo = (array) => {
    let copia = [...array];
    return copia;
}
// Ordenar lista
const ordenarLista = () =>{
    let lista = JSON.parse(localStorage.getItem("productos")) || [];
    lista.sort(((a, b) => a.id - b.id));
    console.log(lista)
    localStorage.setItem("productos", JSON.stringify(lista));
}
//          - Agregar Producto Nuevo
const agregarProducto = () => {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let id = prompt("Ingrese id del producto");
    let nombre = prompt("Ingrese nombre del producto");
    let precio = parseInt(prompt("Ingrese el valor"));
    let img = prompt("Ingrese ruta de imagen");
    let stock = 0;
    let prod = new Producto(id,nombre,precio,img,stock);
    productos.push(prod);
    localStorage.setItem("productos",JSON.stringify(productos));
    ordenarLista();
}
//          - Eliminar Producto
const eliminarProducto = (item) =>{
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let index = productos.indexOf(item);
    //si existe lo borra
    if (index != -1) {
        productos.splice(index, 1);
        localStorage.setItem("productos",JSON.stringify(productos));
    }
}
// Crear Producto desde Panel
const agregarProductoPanel = () => {
    let id = parseInt(document.getElementById("id").value);
    let nombre = document.getElementById("producto").value;
    let precio = parseInt(document.getElementById("valor").value);
    let ruta = document.getElementById("rutaImg").value;
    let stock = parseInt(document.getElementById("stock").value);
    let prod = new Producto(id,nombre,precio,ruta,stock);
    let prods = JSON.parse(localStorage.getItem("productos")) || [];
    prods.push(prod);
    console.log(prods);
    localStorage.setItem("productos",JSON.stringify(prods));
    ordenarLista();
}
const crearProdAdmin = document.querySelector("#btnCrearProducto");
if (crearProdAdmin !== null){
    crearProdAdmin.addEventListener("click", (e)=>{
        e.preventDefault();
        agregarProductoPanel();
        location.reload();
    });
}
// Fetch inventario
const database = "inventario.json";
const userList = "usuarios.json"
const obtenerDatos = async ()=>{
    try{
        let datos = await fetch(database);
        let response = await datos.json();
        let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
        if(listaProductos = []){
            listaProductos = response;
            localStorage.setItem("productos",JSON.stringify(listaProductos));
        }
    } catch(error){
        console.log(error);
    }
}
const obtenerUsuarios = async ()=>{
    try{
        let datos = await fetch(userList);
        let response = await datos.json();
        let listaProductos = JSON.parse(localStorage.getItem("usuarios")) || [];
        if(listaProductos = []){
            listaProductos = response;
            localStorage.setItem("usuarios",JSON.stringify(listaProductos));
        }
    } catch(error){
        console.log(error);
    }
}
// Enviar nuevos datos al inventario

obtenerDatos()
// Carrito (en proceso)
//          - Agregar al Carrito

//          - Eliminar del Carrito

//          - Total Carrito

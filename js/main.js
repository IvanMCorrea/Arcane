// Inicio Sesión
class NewUser{
    constructor(user, pass){
        this.user = user;
        this.pass = pass;
    }
}
const newUsers = () => {
    alert("Cree cuenta nueva");
    let user = prompt("Ingrese nombre de usuario");
    let pass = prompt("Ingrese contraseña");
    alert("Cuenta nueva creada!");
    return new NewUser(user,pass);
}
function login(user,pass){
    let intentos = 3;
    alert("Inicie Sesión");
    let field1 = prompt("Ingrese nombre de usuario");
    let field2 = prompt("Ingrese contraseña");
    while (((field1 != user) || (field2 != pass)) && intentos > 0 ) {
        alert(`Datos incorrectos, le quedan ${intentos} intentos`);
        field1 = prompt("Ingrese nombre de usuario");
        field2 = prompt("Ingrese contraseña");
        intentos--;
    }
    if (intentos > 0) {
        alert("Bienvenido/a");
        console.log("Bienvenido/a");
    }else{
        alert("Acceso denegado");
        console.log("Acceso denegado");
    }
}
const cuenta1 = newUsers();
console.log(cuenta1);
login(cuenta1.user,cuenta1.pass);
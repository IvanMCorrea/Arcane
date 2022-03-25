//Comentario JS
/* let nombre = "Ivan";
let dinero = 0; */

// Usuario ingresa dato y se ve reflejado en consola 
/* let nombreIngresado = prompt("Ingresa tu nombre");

console.log("Hola " + nombreIngresado);
console.log("Bienvenido a la aplicación web de " + nombre);

dinero = parseInt(prompt("cuanto desea donar a este proyecto?"));
console.log(`Gracias por donar ${dinero}`); */
//console.log("Gracias por donar $" + dinero);

//alert("alerta, mensaje de salida");
/* let edad = parseInt(prompt("Ingrese edad"));
if ((edad <= 17) && (edad > 0)) {
    console.log("eres un ninio");
}else if ((edad > 18) && (edad < 40)) {
    console.log("sos joven")
}else if (edad >= 40) {
    console.log("te falta el baston");
}; */


/* Ejercicio Calculadora
let numero1 = parseInt(prompt("Ingrese primer numero"));
let numero2 = parseInt(prompt("Ingrese segundo numero"));
let operacion = prompt("Ingrese tipo de operacion");
let resultado = 0;
switch (operacion){
    case "suma":
        resultado = numero1 + numero2;
        console.log(`el resultado de ${numero1} ${operacion} ${numero2} es ${resultado}`);
        break;
    case "resta":
        resultado = numero1 - numero2;
        console.log(`el resultado de ${numero1} ${operacion} ${numero2} es ${resultado}`);
        break;
    case "multiplicacion":
        resultado = numero1 * numero2;
        console.log(`el resultado de ${numero1} ${operacion} ${numero2} es ${resultado}`);
        break;
    case "division":
        resultado = numero1 / numero2;
        console.log(`el resultado de ${numero1} ${operacion} ${numero2} es ${resultado}`);
        break;
    default:
        alert("no se detecto una operacion matematica");
        break;
} */

// Ejercicio Entregable 1: Inicio Sesión
let intentos = 3;
alert("Cree cuenta nueva");
let user = prompt("Ingrese nombre de usuario");
let pass = prompt("Ingrese contraseña");
alert("Cuenta nueva creada!");
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

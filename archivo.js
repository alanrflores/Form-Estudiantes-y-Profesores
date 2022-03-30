//Con setItem lo guardo! 2 parametros
//1-- la keys, 2-- valor (String)
//Nuestro codigo Guarda la key
/*localStorage.setItem("platano", "🍌");
//Usualmente lo usamos con un if, preguntando, si existe
if(localStorage.getItem("platano")){
const platano = localStorage.getItem("platano")
console.log(platano);
}*/
//Lo muestra, lo obtenemos con getItem
//Para pintarlo utilizo getItem("key")con la llave guardada
//Lo pintamos en consola
//console.log(localStorage.getItem("platano"));

//lo remueve con ("key")
//localStorage.removeItem("platano")

//se puedde guardar todo lo que quieras
//Clear limpia , destruye todo
//localStorage.clear()

const frutas = [
    {
        nombre: "🍌",
        color: "amarillo",
    },
    {
        nombre: "🍒",
        color: "rojo",
    },
    {
        nombre: "🍏",
        color: "verde",
    },
];
//Regla de oro -- recibe un string
//JSON.stringify -- convierte un objeto o valor de javascript en una cadena de texto JSON.
//Lo formatea en JSON como un string para que nosotros lo podamos guardar
localStorage.setItem("frutas", JSON.stringify(frutas));

//Lo capturo 
//Hace lo contrario al otro, viene en un string formateado en json y lo parsea a array de javascript
//En caso de que exista con un if
if(localStorage.getItem("frutas")){
const frutasDesdeLocal = JSON.parse(localStorage.getItem("frutas"));
console.log(frutas);
}
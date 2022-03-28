const formulario = document.querySelector("#formulario");
const cardsEstudiantes = document.querySelector("#cardsEstudiantes");
const cardsProfesores = document.querySelector("#cardsProfesores");
const templateEstudiante = document.querySelector("#templateEstudiante").content;
const templateProfesor = document.querySelector("#templateProfesor").content;


const estudiantes = [];
const profesores = [];

document.addEventListener("click", (e)=>{
    if(e.target.dataset.nombre){
        //console.log(e.target.matches(".btn-success"));
        //si esto es true
        if(e.target.matches(".btn-success")){
            estudiantes.map(item => {
                if(item.nombre === e.target.dataset.nombre){
                    item.setEstado = true;
                }
                return item;
            });
            
        }
        if(e.target.matches(".btn-danger")){
            estudiantes.map(item => {
                if(item.nombre === e.target.dataset.nombre){
                    item.setEstado = false;
                }
                return item;
            });
           
        };
        Persona.pintarPersonaUI(estudiantes, "Estudiante");
    }
});


//Creamos persona generica(padre o madre)
 class Persona {
     constructor(nombre, edad){
         this.nombre = nombre;
         this.edad = edad;
     }

//Metodo static() -- puede ser accedido sin necesidad de instanciar lo que es persona
//Se ocupa el UI -- cuando son cosas que se estan enviando al HTML
     static pintarPersonaUI(personas, tipo){
      if(tipo === "Estudiante"){
//Recomendable empezar con el textContent = "" (en 0) sin informacion
//por que va a ser un ciclo forEach
        cardsEstudiantes.textContent = "";
        const fragment = document.createDocumentFragment();
//Recorremos
        personas.forEach((item) => {
            fragment.appendChild(item.agregarNuevoEstudiante());
        });

        cardsEstudiantes.appendChild(fragment);
      }
      if(tipo === "Profesor"){
          cardsProfesores.textContent ="";
          const fragment = document.createDocumentFragment(); 

          personas.forEach((item) => {
            fragment.appendChild(item.agregarNuevoProfesor());
        });
        cardsProfesores.appendChild(fragment);
      }
     }
 };

//heredamos
class Estudiante extends Persona {
//# -- propiedades| que sea privado y que arranque desactivado
    #estado = false;
    #estudiante = 'Estudiante';

//Como son prop.privadas tenemos que tener un set() para poder modificarlo
set setEstado(estado){
    this.#estado = estado;
 };

//para poder pintar el estudiante
get getEstudiante(){
    return this.#estudiante
 };

//Capturar el template, sacar un clone e ir modificando sus propiedades.
agregarNuevoEstudiante(){
const clone = templateEstudiante.cloneNode(true);
//Ahora con el clone podemos acceder a cada una de las propiedades
clone.querySelector('h5 .text-primary').textContent = this.nombre;
clone.querySelector('h6').textContent = this.getEstudiante;
clone.querySelector('.lead').textContent = this.edad;

//En caso que esto de true;
//className -- reemplaza todas las clases anteriores por las nuevas que le describas
if (this.#estado) {
    clone.querySelector(".badge").className = "badge bg-success";
    clone.querySelector(".btn-success").disabled = true;
    clone.querySelector(".btn-danger").disabled = false;
} else {
    clone.querySelector(".badge").className = "badge bg-danger";
    clone.querySelector(".btn-danger").disabled = true;
    clone.querySelector(".btn-success").disabled = false;
}
    clone.querySelector(".badge").textContent = this.#estado
    ? "Aprobado"
    : "Reprobado";

    clone.querySelector(".btn-success").dataset.nombre = this.nombre;
    clone.querySelector(".btn-danger").dataset.nombre = this.nombre;
 
return clone;
} 
};

class Profesor extends Persona {
    #profesor = "Profesor";

    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#profesor;
        clone.querySelector('.lead').textContent = this.edad;
        return clone;
    }
}


//capturamos el formulario
formulario.addEventListener('submit', e =>{
    e.preventDefault()
//capturar los datos
const datos = new FormData(formulario) 
//desestructuracion de datos 
// ... -- spread operation copia de datos que le ingresan (valores =values)
const [nombre, edad, opcion] = [...datos.values()];

//Si elige la opcion Estudiante, bueno hace esto
if(opcion === "Estudiante"){
const estudiante = new Estudiante(nombre, edad);
//Se agrega al array cada estudiante que se ingrese
estudiantes.push(estudiante);
Persona.pintarPersonaUI(estudiantes, opcion);

   }; 

//Si elige la opcion Profesor, cumplime esto
if(opcion === "Profesor"){
const profesor = new Profesor (nombre, edad)
profesores.push(profesor);
Persona.pintarPersonaUI(profesores, opcion);
 };
});

//Como tenemos un array de Estudiantes y en la class Persona,
//Tenemos un evento static que no necesita instanciarlo que recibe persona y el tipo,
//ejemplo: Si el tipo era estudiante nosotros haciamos toda la operacion que completamos,
//como es estatico lo puedo pintar abajo del if estudiante!(tengo persona y tipo)
// Ejecuta y ve si es un estudiante, va a limpiar nuestro textContent, va a crear el fragment
//y va a ser el recorrido de personas , que tiene en el array de estudiantes.
//va a entrar a este ciclo y va a ejecutar el clone de cada uno de sus template.

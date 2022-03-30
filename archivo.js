const alert = document.querySelector(".alert")
const formulario = document.querySelector("#formulario");
const pintarTodo = document.querySelector("#pintarTodo");
const templateTodo = document.querySelector("#templateTodo").content;
//cuando trabajamos con template lo tenemos que clonar y lo clonamos con .content
//estatico
let todos = [];



const agregarTodo = todo => {
    const objetoTodo = {
        nombre: todo,
        id:`${Date.now()}`
    //devuelve una cadena de texto de milecima de seg. desde 1970 a ahora, para muchos no es fiable
    //esto es un nro pero nostros lo tenemos que guardar atraves de un dataset por lo tanto,
    //lo transformo en un string con `${}`
    }
    //Tengo mi objeto dinamico
    todos.push(objetoTodo)
    
};

const pintarTodos = () => {
//Cada vez que llamo a pintarTodos, es por que se hizo una modificacion por lo tanto me sirve,
//Guardarlo en localstorage.-- no guarda array no guarda objetos , solo string
localStorage.setItem("todos", JSON.stringify(todos));
//Pintar contenido dinamico y despoues borrarlo y sobreescribirlo.
//utilizo la constante creada y borrar lo que tenga adentro, por si esa constante se ejecuta + de 1 vez
 pintarTodo.textContent = "" 

 //Para pintarlo hay que recorrer el objeto ya que es dentro de un array y pueden ser multiples obj.
 //y para evitar el reflow , que se renderice a cada rato nuestro sitio web, utilizamos un fragment,
 //que guarda todo ese array o toda esa estructura en html, lo 100 elementos(ejemplo) y una vez 
 //que esten esos elementos los mandamos a nuestro template.
 
 const fragment = document.createDocumentFragment();
 //Recorremos
 todos.forEach((item) => {
 //Regla de oro: los templates no se pueden utilizar asi como estan, clonamos el contenido
 const clone = templateTodo.cloneNode(true);
 //El clone es el cual modificamos.
 clone.querySelector(".lead").textContent = item.nombre;
 //Era importante que la data de id se guarde en string por que el dataset solo recibe string
 clone.querySelector(".btn").dataset.id = item.id;
 //Una vez que tenemos el clone
 //Agregamos el clone al fragment
 fragment.appendChild(clone);
//REFLOW -- BORRANDO EL DOM Y METIENDOLE ELEMENTOS Y ASI SUCESIVAMENTE.
 });

 pintarTodo.appendChild(fragment);

};

//delegacion de eventos
document.addEventListener('click', (e) => {
   //console.log(e.target.dataset.id);
    if(e.target.matches(".btn-danger")){
     //recorremos
     //filtra lo que no concuerde con esto, todo lo que no se cumpla que me devuelva un array
    todos = todos.filter(item => item.id !== e.target.dataset.id)
    pintarTodos();   
    };
});

formulario.addEventListener ("submit", (e) => {
    e.preventDefault();
    alert.classList.add("d-none");
   //Lo que hacemos a traves de FormData es capturar el "name" todos los input,
   //que tengamos dentro del formulario (Por lo tanto si tenemos 100 input es mas efectivo que estar
   //capturandolos todos a traves de un ID .values);
   const datos = new FormData(formulario);
   
   //Capturar los datos de new data, utilizamos una destructuracion
   //Sacamos los elementos de data a traves del .values() -- Esto nos va a devolver
   //Un array de los elementos de los valores que contengan en este caso sus elementos de los input
   const [todo] = [...datos.values()]; 
   //trim()devuelve un valoor booleano, si hace la negacion me devuelve true
   //lo uso con un if, si me devuelven en caso que no manden nada,
   //espacios en blancos, que vuelva a escribir.
   if(!todo.trim()){
       console.log("te equivocaste mandaste vacio");
       alert.classList.remove("d-none");
   //Importante return para que no siga con nuestro codigo.
       return;
   }
   
   agregarTodo(todo);
   pintarTodos();
      
   });

//Cargar el DOM, espera que cargue el DOM y luego hace la peticion
document.addEventListener('DOMContentLoaded', (e) => {
  if(localStorage.getItem('todos') ){
      todos = JSON.parse(localStorage.getItem('todos'));
      pintarTodos();
  };
});
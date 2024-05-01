//Variables
const carrito = document.querySelector('#carrito');//Selecciona el elemento del carrito donde iran todos los cursos que se compren
const contenedorCarrito = document.querySelector('#lista-carrito tbody');//Listado de cursos - se van agregando en el table body
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');//Vacia el carrito y lo deja limpio
const listaCursos = document.querySelector('#lista-cursos');//Se encuentran los cursos listados
let articulosCarrito = [];//Carrito de compras vacio.

//Registro de eventos
cargarEventListeners();

//Funciones
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vacear el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Resetear el arreglo

        LimpiarHTML(); //Eliminamos todo el HTML
    })
}

function agregarCurso(e) {//La funcion toma el evento click
    e.preventDefault();//Previene q se cargue a otra pagina

    if ( e.target.classList.contains('agregar-carrito') ) {//Ver donde se esta dando click y classList para ver la clase de donde se esta dando click, .contains verifica si el elemento q se esta presionando contiene agregar carrito, si es verdad significa q si presiono el boton agregar curso.
        const cursoSeleccionado = e.target.parentElement.parentElement;//Ver nombre del elemento al q se le esta dando click y ver el padre.
        leerDatosCurso(cursoSeleccionado);//Se le pasa el curso seleccionado
    }
}

//Elimina cursos del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de articulosCarrito por el id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML();//Volvemos a iterar sobre el carrito y mostrar su HTML
    }
}

// //Lee el contenido del html al q le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el contenido del curso actual
    infoCurso = {   //Se llama con el parametro curso, pero tambien se puede document
        imagen: curso.querySelector('img').src,//EXtrae Direccion imagen
        titulo: curso.querySelector('h4').textContent,//EXtrae Titulo imagen
        precio: curso.querySelector('.precio span').textContent, //EXtrae de la clase Precio el span q contiene el precio.
        id:curso.querySelector('a').getAttribute('data-id'),//EXtrae getAttribute('data-id') trae el data-id q tiene el curso.
        cantidad:1 //La cantidad seleccionada por defecto siempre es 1
    }
    
    //Revisa si un elemento ya existe en el carrito con .some
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {//map Crea un nuevo arreglo
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//Retorna el objeto actualizado
            }else {
                return curso; //Retorna los objetos q no son duplicados
            }
        });
         articulosCarrito = [...cursos];
    } else {
        //Agregando articulos al arreglo carrito compras
        articulosCarrito = [...articulosCarrito, infoCurso];
        //se hace una copia carrito y va agregando el objeto de infoCurso
    }

    console.log(articulosCarrito);
    carritoHTML();//Muestra las propiedades de cada articulo dentro del carrito
}

//Muestra el carrito de compras en el html
function carritoHTML() {
    
    //Limpiar el HTML
    LimpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const {imagen, titulo, precio, cantidad, id} = curso; //Se desestructura las propiedades del objeto.

        const row = document.createElement('tr'); //llama la fila y agrega las propiedades del objeto en el carrito
        row.innerHTML = `                         
        <td>
            <img src="${imagen}" width="100"> 
        </td>    
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        
        </td>
        `;
        //Con los td se mostraron las propiedades del objeto en el carrito
        //Con el otro th se indica q borre el curso con un boton


        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}


//Elimina los cursos del tbody
function LimpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}




//APUNTES PROYECTO
/**
 * Se crean las variables:
 * En carrito es donde se iran almacenando los cursos q se seleccionen se toma el id carrito.Un contenedorCarrito  donde se van agregando los cursos en un tbody.
 * ListaCursos es donde se encuentra el listado de cursos.Se crea un boton que va a vaciar el carrito
 */

/**
 * EVENTOS
 * Se crea una funcion cargarEventListeners(); q cargue o registre los eventos y se manda a llamar.
 * Se crea el evento para cuando se de click en agregar el curso lo agregue al carrito. Para q la funcion no quede muy grande se crean diferentes funciones agregarCurso.
 * 
 */

//FUNCIONES
//La funcion agregarCurso toma el evento click cuando se agrega al carrito un curso.
/**
 * Con parentElement.parentElement puedo ver el elemento padre del elemento al q le estamos dando click.
 * Dentro de la funcion de leerDatosCurso se crea un objeto infoCurso que va a contener las propiedades de cada curso. Estas propiedades van a ser iguales a el parametro curso + el .querySelector('').lo q deseo extraer, ej, direccion imagen,titulo, etc.
 * 
 * Una vez se selecciona un curso, se leen sus datos, se llena el arreglo con los objetos de infoCurso. Con spread operator se hace una copia carrito compras, la priemara vez va a estar vacio, al agregar un articulo va a necesitar la referencia del articulo anterior, por tanto es necesario ir copiando el arreglo anterior.
 * 
 * Cuando se agrega un curso se ejecuta la funcion de agregarCurso, nos aseguramos que el usuario haya presionado en agregar carrito y accedemos a todo el div q tiene el contenido del curso.Despues leemos esos datos del curso y creamos un objeto con la info q requerimos, lo agregamos a nuestro carrito de compras y despues imprimimnos ese HTML. 
 * 
 * Como se estaba duplicando el HTML lo primero que hacemos el limpoiar el HTML previo y despues lo volvemos a generar de articulos-carrito, el cual mantiene la referencia del carrito de compras, por lo tanto, si hay uno o dos elementos va a generar nuev/te ese html pero va a limpiar el html previo.
 * 
 * Para limpiar de una forma mas rapida y profesional, se recomienda usar while, donde este se va a ejecutar mientras una condicion sea evaluada como verdadera. Con firstChild se va arevisar q si ese contenedor tiene por lo menos un elemento dentro, el codigo se sigue ejecutando y una vez q es limpiado todo el html dentro de ese contendedor ya no se ejecuta. Con removeChild se le indica que elimine un hijo por el primero.
 */
import { ulLista } from "../js/index.js";


export let   tareas = JSON.parse(localStorage.getItem('tarea')) || [];
       const numeroPendientes = document.querySelector('#numero');

export const objetTarea =( tarea )=>{ //Creamos una funcion que nos va a devolver un objeto que sera guardado en el arreglo 'tareas' con los distintos pendientes que le hayamos asignado en el input.

    return{
    tarea:tarea,
    completado:false,
}

}

export const guardarLocalStorage =( tareas )=>{ //Funcion que nos permite gurdar tareas del arreglo en el localStorage. 

localStorage.setItem('tarea',JSON.stringify(tareas)); //Guardamos las tareas del arreglo en el localStorage.

}


export const eliminarLocalStorage =( event )=>{
    
    const etiqueta  = event.target.parentElement.parentElement; //Nos señala directamente el elemento 'li' de la lista desordenada.
   
    if(event.target.localName === 'button'){ //Condicional que nos indica si el elemento seleccionado(por nombre) es un elemento 'button' => 'En el dom su icono es la 'X''.

       ulLista.removeChild( etiqueta ); //Elimina la etiqueta li del boton 'X' seleccionado.
       tareas = tareas.filter(element => element.tarea != event.path[2].innerText.trim()); //Filtramos solo los elementos del arreglo 'Tareas gurdadas', que sean diferentes con la tarea mostrada en el DOM del 'li' seleccionado, y creamos un nuevo arreglo 'tarea' que sera guardado en el localStorage.
       guardarLocalStorage( tareas );
       contarPendienteLocal();

    }
}

export const contarPendienteLocal =()=>{ //Funcion que nos indicara la cantidad de tareas que aun tenemos pendientes por realizar.
    
    const pendiente = JSON.parse(localStorage.getItem('tarea')); //Obtenemos las tareas en forma de arreglo guardadas en el localStorage

    numeroPendientes.innerText = pendiente.length; //Validamos la longitud del arreglo con 'length: Cantidad de elementos guardados', y lo mostramos en el DOM. 
   
}

export const estadoPendientesLocal =( )=>{//Esta funcion nos permite actualizar la propiedad de completado dentro del objeto tanto a {tarea:'tarea', compleado: false} o {tarea:'tarea', compleado: true}. 

    let labelText = event.path[1].childNodes[3];//Esta variable nos señala el elemento 'Label' dentro del li>div.

    tareas = tareas.map(( arr )=>{//Recorremos el arreglo de las tareas guardadas con el metodo .map().

        if(arr.tarea == labelText.innerText){//Si, la propiedad tarea=>'nombre', es igual al texto de la etiqueta label.
   
          arr.completado = !arr.completado; //el valor de 'completado' va a ser igual a lo contrario de lo que 'completado' actualmente tiene. El valor es un boleano: true o false.  
          
          return arr; //Regreso el arreglo con el nuevo valor fuera del 'if'.
           
        }
        return arr;//Regreso el arreglo con el nuevo valor fuera de 'map'.
      })

      guardarLocalStorage( tareas )

}

//La clase 'hiden' se encuentra en el archivo styles.css 'hiden:{ display: none }' el cual nos ayudara a ocultar las etiquetas a las cual esta clase se agregue.

export const filtrarCompletados =( filt )=>{
 //Si estas etiquetas 'NO' cuentan con la clase 'completados'.
   if(!filt.classList.contains('completado')){ //filt.classList.contains('completado')==false
        filt.classList.add('hiden'); //Ocultar estas etiquetas 'li'.
    }    
}

export const filtrarPendientes =(filt)=>{ 
//Si estas etiquetas cuentan con la clase 'completados'.
    if(filt.classList.contains('completado')){//filt.classList.contains('completado')==true
        filt.classList.add('hiden');//Ocultar estas etiquetas 'li'.
    }
}
import {tareas, guardarLocalStorage,objetTarea,eliminarLocalStorage ,contarPendienteLocal, estadoPendientesLocal,filtrarCompletados,filtrarPendientes } from "../js/index.js"; 
       
export const lista       = document.querySelector('#lista-tareas'),
             textBox     = document.querySelector('#nueva-tarea'),
             ulLista     = document.querySelector('#lista-tareas'),
             botonFilter = document.querySelector('#buttons-filter');
             

export const crearTarea = ( element )=>{ //Recibimos el valor ingresado en el texbox, agregamos el valor dentro de las plantilla literales (elemento html) que se agregaran a la lista desordenada 'ul'

    const html = `<li class="list-group-item ${(element.completado)?'completado':''}">
    <div class='vista'>
    <input class='form-check-input' type='checkbox' id='pendiente' ${(element.completado)?'checked':''}>
    <label class="form-check-label ${(element.completado)?'text-decoration-line-through':''}" for='pendiente'>${ element.tarea }</label>
    <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    </li>`;

    lista.innerHTML += html;
    
}

   
textBox.addEventListener('keyup',( event )=>{//Escuchamos el evento de la tecla que presionamos dentro del textbox, en este caso, necesitamos la tecla 'ENTER' = 'KEYUP : 13'.
   
    if(event.keyCode === 13 && textBox.value.length > 0){
       
        let nuevoPendiente = objetTarea(textBox.value);//Enviamos el valor del texbox a la funcion que nos devolvera un objeto con este dato actualizado.
        
        crearTarea( nuevoPendiente );//Enviamos el objeto recibido a la funcion que creara el elemento 'li' y agregara al documento HTML que nos permitira vizualisar la tarea.
        tareas.push( nuevoPendiente );//Agregamos el objeto con los valores actualizados '{tarea, completado=false}' al arreglo de tareas.
        guardarLocalStorage( tareas );//Enviamos el arreglo, el cual se va actualizando con las tareas guardadas en el mismo, a la funcion que se encargara de gurdar y actualizar la inf. en el localSorage del navegador.

        textBox.value='';//Limpiamos la caja de texto despues de dar enter y haber guardado la tarea.
       
        contarPendienteLocal();//Ejecutamos la funcion para actualizar el conteo de pendientes.

    }
});


ulLista.addEventListener('click', ( event )=>{//Evento que nos permite escuchar los clicks dentro del elemento 'ul'.

    const elemento  = event.srcElement.checked; //Esta variable me pertime saber si el elemento 'checked' se selecciono como 'true' o se quito la seleccion 'false'.
      
      eliminarLocalStorage( event );//Enviamos el evento a la funcion que elimina el registro del localstorage y el elemento html con la tarea seleccionada.

      if(elemento === true){//Validamos si la tarea ha sido completada con ayuda del elemento cheked

          estadoPendientesLocal();
          event.path[1].childNodes[3].classList.add('text-decoration-line-through');//Si la tarea se ha completado, agregamos la clase de bootstrap que tacha el label con la tarea.
          event.target.parentElement.parentElement.classList.add('completado');//Agregamos la clase 'completado' al elemento li que nos ayudara a filtrar por clase si la tarea ha sido completada o no con la funcion filtrar completado y filtrar pendientes.
         
    }else if(elemento === false){//Validamos si la tarea aun no a sido completada con ayuda del elemento cheked
    
        estadoPendientesLocal();
        event.path[1].childNodes[3].classList.remove('text-decoration-line-through');//Si la tarea no sea completado, eliminamos la clase de bootstrap que anterior mente le habias aignado.
        event.target.parentElement.parentElement.classList.remove('completado');//Eliminamos la clase 'completado' del elemento li que anteriormente le habiamos dado.

    }    
});

botonFilter.addEventListener('click', (event)=>{//Este evento nos permite escuchar los clicks en el div =>'buttons-filter' que contiene los botonos 'todos','completados' y 'pendientes'.

    let liFilter = ulLista.children; //Variable que contiene la colleccion '[li,li,li]' dentro de la ul.
    const pendiente = event.target.text; //variable que contiene el nombre text de los elementos html presionados.

    if(pendiente == undefined){return;} //Si preionamos en alguna otra parte dentro del div nos devolvera 'undefine', asi que pedimos nos devuelva nada hasta presionar uno de los botonoe.
    
    
    for(let filt of liFilter){//Recorremos la coleccion 'ul' para que nos muestre los elementos 'li' que contiene y asi poder trabajar con ellos.

        filt.classList.remove('hiden');

        switch(pendiente){//dependiendo el evento click que haya atrapado donde nosotros hayamos presionado, decidira cual de los 2 case elejir.

            case 'Completados':

            filtrarCompletados(filt);//Enviamos el elemento li a la funcion que filtrara las tareas completadas.

            break;

            case 'Pendientes':

            filtrarPendientes(filt);//Enviamos el elemento li a la funcion que filtrara las tareas pendientes.

            break;
        }
    }    

});



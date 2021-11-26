import {tareas, guardarLocalStorage,objetTarea,eliminarLocalStorage ,contarPendienteLocal, estadoPendientesLocal,filtrarCompletados,filtrarPendientes } from "../js/index.js"; 
       
export const lista       = document.querySelector('#lista-tareas'),
             textBox     = document.querySelector('#nueva-tarea'),
             ulLista     = document.querySelector('#lista-tareas'),
             botonFilter = document.querySelector('#buttons-filter');
             

export const crearTarea = ( element )=>{

    const html = `<li class="list-group-item ${(element.completado)?'completado':''}">
    <div class='vista'>
    <input class='form-check-input' type='checkbox' id='pendiente' ${(element.completado)?'checked':''}>
    <label class="form-check-label ${(element.completado)?'text-decoration-line-through':''}" for='pendiente'>${ element.tarea }</label>
    <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    </li>`;

    lista.innerHTML += html;
    
}

   
textBox.addEventListener('keyup',( event )=>{
   
    if(event.keyCode === 13 && textBox.value.length > 0){
       
        let nuevoPendiente = objetTarea(textBox.value);
        
        crearTarea( nuevoPendiente );
        tareas.push( nuevoPendiente );
        guardarLocalStorage( tareas );

        textBox.value='';
        contarPendienteLocal();

    }
});


ulLista.addEventListener('click', ( event )=>{

    const elemento  = event.srcElement.checked; //Esta variable me pertime saber si el elemento 'checked' se selecciono como 'true' o se quito la seleccion 'false'.
      
      eliminarLocalStorage( event );

      if(elemento === true){
          estadoPendientesLocal();
          event.path[1].childNodes[3].classList.add('text-decoration-line-through');
          event.target.parentElement.parentElement.classList.add('completado');
         
    }else if(elemento === false){
    
        estadoPendientesLocal();
        event.path[1].childNodes[3].classList.remove('text-decoration-line-through');
        event.target.parentElement.parentElement.classList.remove('completado');

    }    
});

botonFilter.addEventListener('click', (event)=>{

    let liFilter = ulLista.children;
    const pendiente = event.target.text;

    if(pendiente == undefined){return;}
    
    for(let filt of liFilter){

        filt.classList.remove('hiden');

        switch(pendiente){

            case 'Completados':

            filtrarCompletados(filt);

            break;

            case 'Pendientes':

            filtrarPendientes(filt);

            break;
        }
    }    

});



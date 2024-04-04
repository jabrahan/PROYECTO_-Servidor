const usuario = JSON.parse(localStorage.getItem('usuario'));
const formTodos = document.querySelector('#form-todos'); 
const inputTodos = document.querySelector('#form-input');
const listado = document.querySelector('#todos-list'); 
const cerrarSesion = document.querySelector('#cerrar-btn'); 



if(!usuario) {
    window.location.href = '/'
} 

//Mostrar las tareas de ese usuario
//Consulta al recurso de tareas  http://localhost:3000/tareas

const consultaListado = async () => {

 const listadoTareas = await fetch('http://localhost:3000/tareas', {
    method:"GET"
})

 const listaT = await listadoTareas.json(); 
 //console.log(listaT);

 const arrayT = listaT.filter(i => i.idUsuario === usuario.id);

 console.log(arrayT);

arrayT.forEach(i => {
    const listas = document.createElement('li');
        
        listas.innerHTML = `
                <li id=${i.id} class="todo-item">
                <button class="delete-btn">&#10006;</button>
               <p> ${i.tarea} </p> 
                <button class="check-btn">&#10003;</button></li> `
        listado.appendChild(listas); 
        inputTodos.value = '';
})

}


consultaListado();





formTodos.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3000/tareas', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            //Solo recibe strings 
            body: JSON.stringify({
                tarea:inputTodos.value,
                idUsuario:usuario.id 
            }) 
        }); 

    const id = await fetch('http://localhost:3000/tareas', {
        method:"GET",
    })

    const idTarea = await id.json() 

    

    const idDefi = idTarea[idTarea.length-1].id;

    console.log(idDefi);


        //Mostrar Listado de elementos en el HTML
        const listas = document.createElement('li');
        listas.innerHTML = `
                <li id=${idDefi} class="todo-item">
                <button class="delete-btn">&#10006;</button>
               <p> ${inputTodos.value} </p>
                <button class="check-btn">&#10003;</button></li> `
        listado.appendChild(listas); 
        inputTodos.value = ''; 

       //consultaListado();

}); 

cerrarSesion.addEventListener('click',  e => {
    localStorage.removeItem('usuario'); 
    window.location.href = '/'; 


});



listado.addEventListener('click', async e=> {

    if(e.target.classList.contains('delete-btn')) {
        const element = e.target.parentElement.id
        console.log(`http://localhost:3000/tareas/${element}`);
        
        await fetch(`http://localhost:3000/tareas/${element}`, {
            method:'DELETE'
        });

        e.target.parentElement.parentElement.remove();
    } else if(e.target.classList.contains('check-btn')){
        const ress = e.target.parentElement.querySelector('p'); 
        console.log('Hola')
        const element = e.target.parentElement.id;
        // SE PUEDE USAR EL METODO UPDATE O PATCH
    const resultadoJson =    await fetch(`http://localhost:3000/tareas/${element}`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({checked:ress.classList.contains('check-todo')? false:true}) 
        });

        const res = await resultadoJson.json(); 
        

        ress.classList.toggle('check-todo')
    }

});
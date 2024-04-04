const formLogin = document.querySelector('#form-login');
const inputLogin = document.querySelector('#login-input');
const formCreate = document.querySelector('#form-create');
const inputCreate = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');
//Como estoy exportando un modulo no es encesario poner el .js al final
const userRouter  = require('./controllers/usuarios');
const axios = require('axios');



//Asincronismo se declara al llamar la funcion "async miFuncion() {}"


formCreate.addEventListener('submit', async (e) => {
    e.preventDefault();

    const consultaUsuarios = await fetch('http://localhost:3000/usuarios', {
        method:"GET"
    }); 

    const listaDeUsuarios = await consultaUsuarios.json(); 
    //console.log(listaDeUsuarios)

    // Validar que el usuario exista o no 
    const existeUsuario = listaDeUsuarios.find(i => {
      return  i.nombre === inputCreate.value
    });

    //console.log(existeUsuario)

    if(!inputCreate.value) {
        //campo vacio
        //console.log('Campo vacio')
        notificacion.innerHTML = `Campo de usuario no puede estar vacio`; 
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        },3000)

    } else if(existeUsuario){
        console.log('El usuario existe')

        notificacion.innerHTML = `El usuario ya Existe`; 
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        },3000)

    } else {
        // Campo lleno 
        //console.log('Campo lleno')

        //CRUD Metodos 
        //EL await va donde solicito el recurso 
        await fetch('http://localhost:3000/usuarios', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            //Solo recibe strings 
            body: JSON.stringify({
                nombre:inputCreate.value
            }) 
        });
        //Enviando al backend o router/controller 
        const respuesta = await axios.post('/api/users', nombre);
        console.log(respuesta); 


        notificacion.innerHTML = `El usuario ha sido Creado`; 
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        },3000)
         
    }

});

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const consultaUsuarios = await fetch('http://localhost:3000/usuarios', {
        method:"GET"
    }); 

    const listaDeUsuarios = await consultaUsuarios.json(); 
    //console.log(listaDeUsuarios)

    const existeUsuario = listaDeUsuarios.find(i => {
        return  i.nombre === inputLogin.value
      });
  

    if(inputLogin.value === '') {
        //console.log('Campo vacio')

        notificacion.innerHTML = `El Campo no puede estar vacio`; 
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        },3000)

    } else if(!existeUsuario) {
        //console.log('El usuario no existe')

        notificacion.innerHTML = `El usuario no existe`; 
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        },3000)
    } else {
        //console.log('El usuario existe');

        notificacion.innerHTML = `Ha iniciado Sesion`; 
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        },3000)

        localStorage.setItem('usuario', JSON.stringify(existeUsuario));
        window.location.href = '/tareas/'
    }

})
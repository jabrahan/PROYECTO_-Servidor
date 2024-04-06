//1 Definir el Router 
//router: POST, GET, PUT, DELETE, registro, consultar 

const usuario = require('../models/usuario');

const userRouter = require('express').Router();
const user = require('../models/usuario'); //importar el modelo de la base  


//2. Registro de ese usuario en la BD 

userRouter.post('/', async (req, res) => {
    console.log(req.body);
    //Cuando ingresa a este controlador es porque lo estoy llamando desde el JS del frontend relacionado al formulario. 
    const {nombre} = req.body;
    //Este console.log() va a aparecer en la terminar del servidor.(NO EN EL NAVEGADOR) 
    console.log(nombre); 

    //Luego nos toca enviarlos a la BD
    //Validaciones a nivel de backend.
    
    if(!nombre) {

        //Validar que el campo no este vacio y retornar esa validacion al Front End
        console.log('El campo esta vacio');
        return res.status(400).json({
            error: 'El campo de nombre no puede estar vacio'

        });
    }  else {
        // Caso en que esta correcto para registrar
        // Luego nos toca enviarlos a la BD
        

        let usuario = new user();
        usuario.nombre = nombre;
        
        async function guardarUsuario() {
            await usuario.save(); //Guarda el usuario en la BD
            const usuarioConsulta = await user.find();
            console.log(usuarioConsulta);

            
        };

        guardarUsuario().catch(console.error);

        return res.status(200).json({
            message: 'Usuario creado'
        });
    }
});

//Exportar el Router
module.exports = userRouter; 

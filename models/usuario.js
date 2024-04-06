const mongoose = require('mongoose');
const userRouter = require('../controllers/usuarios');

//Definir el esquema para usuario

const usuarioSquema = new mongoose.Schema({
    nombre: String
});

//Configurar la respuesta del usuario en el squema 
usuarioSquema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
})

//Registrar el modelo
const usuario = mongoose.model('Usuario', usuarioSquema);


//exportar el modelo
module.exports = usuario;


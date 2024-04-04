require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./controllers/usuarios');

//FORMATO MVC MODELO, VISTA, CONTROLADOR 


//Conexion a BD
//Sintaxis de llamado automatico 
(async() => {
    try {
        await mongoose.connect(process.env.MONGO_TOKEN);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
    }})();


//RUTAS DE FRONTEND (HAY QUE CREAR UNA RUTA POR CADA VENTANA QUE TENGAMOS)
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/tareas', express.static(path.resolve('views', 'tareas')));
app.use('/controllers', express.static(path.resolve('controllers')));





//RUTAS DE BACKEND
//Va a estar asociada a los routers, cada modelo debe tener un router asociado. 
app.use('/api/users', userRouter);   



module.exports = app;
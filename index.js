const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan'); 
const app = express();
const pokemon = require('./routes/pokemon');

/*Verbos HTTP\
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Pagina inicial
app.get("/",(req,res, next) => {
    return res.status(200).json({code: 1, message: "Welcome to the Pokedex"});
});

//Middleware
app.use("/pokemon",pokemon);

//another middleware
app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "Not Found"});
});

app.listen(process.env.port || 3000, () => {
    console.log('Server is running...');
});
//Dependencies
const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')
const cors = require('./middleware/cors')
    /*Verbos HTTP\
    GET - obtener recursos
    POST - almacenar/crear recursos
    PATCH - modificar una parte de un recurso
    PUT - modificar un recurso
    DELETE - borrar un recurso
    */
    //authorize Login
app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Pagina inicial
app.get("/", index);

//Tabla user 
app.use("/user", user);
//Middleware
app.use(auth);
//Tabla pokemon
app.use("/pokemon", pokemon);
//another middleware
app.use(notFound);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});
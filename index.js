const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

/*Verbos HTTP\
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/

//Pagina inicial
app.get("/",(req,res, next) => {
    return res.status(200).send("Welcome to the Pokedex");
});
//Mostrar todos los pokemon
app.get("/pokemon",(req,res, next) => {
    console.log(req.params.name);
    return res.status(200).send(pokemon);
})
//Buacar pokemon por numero
app.get('/pokemon/:id([0-9]{1,3})',(req,res,next) => {
    const id = req.params.id - 1;
    if(id >= 0 && id <=150)
    {
        return res.status(200).send(pokemon[req.params.id-1]);
    }
    return res.status(404).send("This Pokemon doesn't exist");
    
})
//Buscar pokemon por nombre
app.get('/pokemon/:name([A-Za-z]+)',(req,res, next)=>{
    const name = req.params.name;

    const pk = pokemon.filter((p)=>
    {
    //Operador terniario
    //condicion ? valor si verdadero : valor si falso
        return (p.name.toUpperCase()==name.toUpperCase()) ?  p : null;
        
    })

    //Operador terniario
    //condicion ? valor si verdadero : valor si falso
    (pk.length > 0) ? 
        res.status(200).send(pk) : 
        res.status(404).send("This Pokemon doesn't exist");
})

app.listen(process.env.port || 3000, () => {
    console.log('Server is running...');
});
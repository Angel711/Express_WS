const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

/*Verbos HTTP\
GET
POST
PATCH
PUT
DELETE
*/
app.get("/",(rec,res, next) => {
    res.status(200);
    res.send("Welcome to the PokeDex");
});

app.get("/pokemon",(rec,res, next) => {
    console.log(rec.params.name);
    res.status(200);
    res.send(pokemon);
})
app.get('/pokemon/:id',(rec,res,next) => {
    res.status(200);
    res.send(pokemon[rec.params.id-1]);
})

app.listen(process.env.port || 3000, () => {
    console.log('Server is running...');
});
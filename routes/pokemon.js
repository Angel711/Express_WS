const express = require('express');
const pokemon = express.Router();
const pk = require('../pokedex.json').pokemon;

pokemon.post("/",(req,res, next)=>
{
    return res.status(200).send(req.body);
})

//Mostrar todos los pokemon
pokemon.get("/",(req,res, next) => {
    return res.status(200).send(pk);
})
//Buacar pokemon por numero
pokemon.get('/:id([0-9]{1,3})',(req,res,next) => {
    const id = req.params.id - 1;
    if(id >= 0 && id <=150)
    {
        return res.status(200).send(pk[req.params.id-1]);
    }
    return res.status(404).send("This Pokemon doesn't exist");
    
})
//Buscar pokemon por nombre
pokemon.get('/:name([A-Za-z]+)',(req,res, next)=>{
    const name = req.params.name;

    const pkmn = pk.filter((p)=>
    {
    //Operador terniario
    //condicion ? valor si verdadero : valor si falso
        return (p.name.toUpperCase()==name.toUpperCase()) &&  p;
        
    });

    //Operador terniario
    //condicion ? valor si verdadero : valor si falso
    (pkmn.length > 0) ? 
        res.status(200).send(pkmn) : 
        res.status(404).send("This Pokemon doesn't exist");
});

module.exports = pokemon;
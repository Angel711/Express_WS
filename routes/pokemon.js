const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",(req,res, next)=>
{
    return res.status(200).send(req.body);
})

//Mostrar todos los pokemon
pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
})
//Buacar pokemon por numero
pokemon.get('/:id([0-9]{1,3})',async(req,res,next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id='"+id+"';")
    if(id >= 0 && id <=722)
    {
        return res.status(200).json(pkmn);
    }
    return res.status(404).send("This Pokemon doesn't exist");
    
})
//Buscar pokemon por nombre
pokemon.get('/:name([A-Za-z]+)', async (req,res, next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';")
    return (pkmn.length > 0) ?
    res.status(200).json(pkmn):
    res.status(404).send("This Pokemon doesn't exist");
    /*  const pkmn = pk.filter((p)=>
    {
    //Operador terniario
    //condicion ? valor si verdadero : valor si falso
        return (p.name.toUpperCase()==name.toUpperCase()) &&  p;
        
    });

    //Operador terniario
    //condicion ? valor si verdadero : valor si falso
    (pkmn.length > 0) ? 
        res.status(200).send(pkmn) : 
        res.status(404).send("This Pokemon doesn't exist"); */
});

module.exports = pokemon;
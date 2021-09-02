const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",(req,res, next)=>
{
    return res.status(200).json(req.body);
});

//Mostrar todos los pokemon
pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
});
//Buacar pokemon por numero
pokemon.get('/:id([0-9]{1,3})',async(req,res,next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id='"+id+"';")
    if(id >= 1 && id <=722)
    {
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).send({code: 404, message: "This pokemon doesn't exist"});
    
});
//Buscar pokemon por nombre
pokemon.get('/:name([A-Za-z]+)', async (req,res, next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';")
    return (pkmn.length > 0) ?
    res.status(200).json({code: 1, message: pkmn}):
    res.status(404).send({code: 404, message: "This pokemon doesn't exist"});
});

module.exports = pokemon;
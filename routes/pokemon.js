const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",async (req,res, next)=>
{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience)
    {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows  == 1)
        {
            return res.status(201).json({code: 201, message:"Pokemon inserted successfully"});
        }
        return res.status(500).json({code: 500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
    
});

//Mostrar todos los pokemon
pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(201).json({code: 201, message: pkmn});
});
//Buacar pokemon por numero
pokemon.get('/:id([0-9]{1,3})',async(req,res,next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id='"+id+"';")
    if(id >= 1 && id <=722)
    {
        return res.status(201).json({code: 201, message: pkmn});
    }
    return res.status(404).send({code: 404, message: "This pokemon doesn't exist"});
    
});
//Buscar pokemon por nombre
pokemon.get('/:name([A-Za-z]+)', async (req,res, next)=>{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';")
    return (pkmn.length > 0) ?
    res.status(201).json({code: 201, message: pkmn}):
    res.status(404).send({code: 404, message: "This pokemon doesn't exist"});
});

module.exports = pokemon;
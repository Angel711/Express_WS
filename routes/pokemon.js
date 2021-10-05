const express = require('express');
const pokemon = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');

//Insertar un nuevo pokemom
pokemon.post("/", async(req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon inserted successfully" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

});

//Delete a Pokemon

pokemon.delete("/:id([0-9]{1,3})", async(req, res, next) => {
    const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Pokemon deleted successfully" });
    }
    return res.status(404).json({ code: 404, message: "Couldn't find the pokemon in the database" });
});
//Actualizar datos de un pokemon
pokemon.put("/:id([0-9]{1,3})", async(req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height}`;
        query += `,pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id = ${req.params.id};`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pokemon updated successfully" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

});


pokemon.patch("/:id([0-9]{1,3})", async(req, res, next) => {
    if (req.body.pok_name) {
        let query = `UPDATE pokemon SET pok_name ='${req.body.pok_name}' WHERE pok_id = ${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pokemon updated successfully" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

});


//Mostrar todos los pokemon
pokemon.get("/", async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(201).json({ code: 201, message: pkmn });
});
//Buacar pokemon por numero
pokemon.get('/:id([0-9]{1,3})', async(req, res, next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id='" + id + "';")
    if (id >= 1 && id <= 722) {
        return res.status(201).json({ code: 201, message: pkmn });
    }
    return res.status(404).send({ code: 404, message: "This pokemon doesn't exist" });

});
//Buscar pokemon por nombre
pokemon.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='" + name + "';")
    return (pkmn.length > 0) ?
        res.status(201).json({ code: 201, message: pkmn }) :
        res.status(404).send({ code: 404, message: "This pokemon doesn't exist" });
});

module.exports = pokemon;
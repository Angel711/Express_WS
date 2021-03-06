const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');

user.post('/signin', async(req, res, next) => {
    const { user_name, user_mail, user_password } = req.body;
    if (user_name && user_mail && user_password) {
        let query = "INSERT INTO user (user_name, user_mail, user_password) "
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}');`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "The user has been added successfully" });

        }
        return res.status(500).json({ code: 500, message: "Theres a problem creating the user" })
    }
    return res.status(500).json({ code: 500, message: "incomplete fields" })
})

//Login
user.post('/login', async(req, res, next) => {
    const { user_mail, user_password } = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    console.log(rows);
    if (user_mail && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } else {
            return res.status(401).json({ code: 401, message: "User not found" });
        }
    }
    return res.status(200).json({ code: 500, message: "Incomplete fields" });
})


user.get("/", async(req, res, next) => {
    const query = "SELECT * FROM user;";

    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows });
})


module.exports = user;
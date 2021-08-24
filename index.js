const express = require('express');
const app = express();

/*Verbos HTTP\
GET
POST
PATCH
PUT
DELETE
*/
app.get("/",(rec,res, next) => {
    res.status(200);
    res.send("Bienvenido");
});

app.get("/:name",(rec,res, next) => {
    console.log(rec.params.name);
    res.status(200);
    res.send("Hola "+ rec.params.name);
})

app.listen(process.env.port || 3000, () => {
    console.log('Server is running...');
});
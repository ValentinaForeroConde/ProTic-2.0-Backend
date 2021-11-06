import express from 'express';

const app = express();
const port = 5500

app.get("/", (req, res)=> {
    res.send("Hola, grupo ProTic 2.0")
});

app.listen(port, ()=> {
    console.log("servidor activo y funcionando")
})

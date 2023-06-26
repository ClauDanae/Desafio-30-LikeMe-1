// Levantando el servidor
const express = require('express');
const app = express();
const { agregarPost, getPost } = require('./post');
const cors = require('cors')

app.listen(3001, console.log("¡Servidor encendido en el puerto 3001!"));
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

app.get('/posts', async (req, res) => {
    const likeme = await getPost()
    res.json(likeme)
})

app.post('/posts', async (req, res) => {
    try {
        const { titulo, url, descripcion, likes } = req.body
        await agregarPost(titulo, url, descripcion, likes)
        res.send("Post agregado con éxito");
    }
    catch (error) {
        res.send(error)
    }
})
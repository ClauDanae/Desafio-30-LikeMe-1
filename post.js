const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

//Agregar post
const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    try {
        const result = await pool.query(consulta, values)
        console.log("Post agregado con éxito 😮")
    } catch (error) {
        console.log(error)
    }
}

//Consultar post
const getPost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

module.exports = {agregarPost, getPost}

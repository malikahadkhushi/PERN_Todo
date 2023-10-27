const express = require('express');
const pool = require('../db');
const app = express.Router();
app.get('/',async (req,resp)=>{

try {

    let data = await pool.query('Select * from users');
    resp.send(data.rows);


} catch (error) {
    console.log(error)
}
})

module.exports = app;
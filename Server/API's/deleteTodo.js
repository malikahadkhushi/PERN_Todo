const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../JWT/verifyToken');
const pool = require('../db');
const secretKey = 'SECRET_KEY';
const app = express.Router();

app.delete('/:id',async (req,resp)=>{
    try {
        let token = verifyToken(req.headers);
        let decode = jwt.verify(token,secretKey);
        if(decode){
            let ack = await pool.query(`Delete from todo where todoid = ${req.params.id}`);
            if(ack){
                resp.status(200).send('Todo Deleted Successfully');
            }
            else
            {
                resp.status(404).send('Todo Not Found');
            }
        }
       
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            resp.status(401).send('Token is Expire');
        }
    }
});

module.exports = app;
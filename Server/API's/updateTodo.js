const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../JWT/verifyToken');
const secretKey = 'SECRET_KEY';
const pool = require('../db');

app.use(express.json());

app.put('/',async (req, resp) => {
    try {
        let token = verifyToken(req.headers);
        let decode = jwt.verify(token, secretKey);
        console.log('decode',decode)
        if (decode) {
            let data = req.body;
            let ack =await pool.query(`update todo set des  ='${data.des}' where todoid = ${data.todoid}`);
            if(ack){
                resp.status(200).send('Todo Update Successfully');
            }
            else 
            {
                resp.status(401).send('Todo Update Unsuccessfully');
            }
        }
      
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            resp.send('Token is Expire');
        }
    }

});

module.exports = app;
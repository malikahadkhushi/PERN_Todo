const express = require('express');
const pool = require('../db');
const verifyToken = require('../JWT/verifyToken');
const jwt = require('jsonwebtoken');
const secretKey = 'SECRET_KEY';


const app = express.Router();


app.get('/', async (req, resp) => {
    try {

        let token = verifyToken(req.headers);
        let decode = jwt.verify(token, secretKey);
        console.log(decode)
        if (decode) {
            let id = decode.id;
            let data = await pool.query('select * from todo');
            data = data.rows;
            let userData = data.filter((d) => {
                if (d.userid === id) {
                    return d;
                }
            });
            resp.status(200).send(userData);
            console.log(userData)
        }

        else
         {
            resp.status(401).send('Token is Expire');
        }
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            resp.status(401).send('Token is Expire');
        }
    }
});

module.exports = app;
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../JWT/verifyToken');
const secretKey = 'SECRET_KEY';
const pool = require('../db');

const app = express.Router();

app.use(express.json());
app.post('/', async (req, resp) => {

    try {

        let token = verifyToken(req.headers);
        let decode = jwt.verify(token, secretKey);
        console.log(decode)
        let data = req.body;

        if (decode && data.des == "") {
            let ack = await pool.query(`insert into todo(todoid,des,userid)values(${data.todoid},'${data.des}',${decode.id})`);
            if (ack) {
                resp.status(200).send('Todo Added');
            }
        }
        else{

            resp.status(401).send('Please Fill Your Field');
        }
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            resp.status(401).send('Token is Expire');
        }
    }

})

module.exports = app;
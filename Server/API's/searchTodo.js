const express = require('express');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const secretKey = 'SECRET_KEY';
const verifyToken = require('../JWT/verifyToken');
const app = express.Router();


app.use(express.json());
app.post('/:id', async (req, resp) => {

    try {

        let token = verifyToken(req.headers);
        let decode = jwt.verify(token, secretKey);
        let id = req.params.id;
        let userTodos = await pool.query(`select * from todo where userid = ${decode.id}`);

        let todo = userTodos.rows.find((t) => {
            return t.todoid == id;
        });

        let { todoid, des } = { ...todo };

        if (todo) {
            resp.status(200).send({ todoid, des });
        }
        else {
            resp.status(404).send('Todo  Not Found');
        }

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            resp.status(401).send('Token is Expire');
        }
    }

});

module.exports = app;
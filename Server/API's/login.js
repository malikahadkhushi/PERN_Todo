const express = require('express');
const app = express.Router();
const pool = require('../db');
const tokenGenrator = require('../JWT/tokenGen');
app.use(express.json());

app.post('/', async (req, res) => {
    try {
        let userData = req.body;
        if (userData.email && userData.password) {

            let data = await pool.query('select * from users');
            data = data.rows;

            let user = data.find((u) => {

                return u.useremail === userData.email && u.userpassword === userData.password

            });
            if (user) {
                token = tokenGenrator(user.userid);
                res.status(200).send('User Login Successfull');
            }
            console.log(token);
        }
        else
        {
            res.status(401).send('Fill All Fields');
        }
    } catch (error) {
        console.log(error)
    }
});
module.exports = app;

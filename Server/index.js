const express = require('express');
const app = express();

const getAPi = require("./API's/getApi");
const loginApi = require("./API's/login");
const getTodo = require("./API's/getTodo");
const addTodo = require("./API's/addTodo");
const updateTodo = require("./API's/updateTodo");
const searchTodo = require("./API's/searchTodo");
const deleteTodo = require("./API's/deleteTodo");

app.use('/',getAPi);
app.use('/login',loginApi);
app.use('/getTodo',getTodo);
app.use('/addTodo',addTodo);
app.use('/updateTodo',updateTodo);
app.use('/searchTodo',searchTodo);
app.use('/deleteTodo',deleteTodo);

app.listen(4000,()=>{
    console.log('Server is Running on port 5000......');
})
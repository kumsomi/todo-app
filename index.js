const express=require('express');
const app=express()

const bodyParser=require("body-parser")
const portNo=3000

const todoData=require("./data/todoData.json")

const fs=require('fs')

const {engine} = require("express-handlebars")
app.engine("handlebars",engine());
app.set("view engine", "handlebars");

app.use(bodyParser.json())
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false })) //This middleware is responsible for parsing the form data and making it accessible in req.body.

app.post("/",(req,res)=>{
    console.log('request body',req.body)
    const {todoTitle, description}=req.body
    if(!todoTitle){
        return res.status(400).send("missing required fields")
    }
    else{
        const newTodo={todoTitle, description, id:todoData.length+1}
        todoData.push(newTodo)
        // write the new todo array to the file
        fs.writeFileSync('./data/todoData.json',JSON.stringify(todoData))
        // res.json(newTodo);
        res.redirect("/");
    }
    
})
app.get('/',(req,res)=>{
    res.render("home",{todoActivities:todoData})
})
app.get('/:id',(req,res)=>{
    const todoId=req.params.id
    res.json(todoData.find(eachtodo=>eachtodo.id===parseInt(todoId)))
})
app.delete('/:id',(req,res)=>{
    const todoId = req.params.id;
    const requiredTodoIndex = todoData.findIndex(eachtodo => eachtodo.id === parseInt(todoId));
    
    if (requiredTodoIndex !== -1) {
        todoData.splice(requiredTodoIndex, 1);
        fs.writeFileSync('./data/todoData.json', JSON.stringify(todoData));
    }
    
    res.redirect('/');
}) 


.listen(portNo,()=>console.log(`server listening at http://localhost:${portNo}`))
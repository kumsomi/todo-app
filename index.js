const express=require('express');
const app=express()
const portNo=3000

app.get('/',(req,res)=>res.send('todo app setup'))
.listen(portNo,()=>console.log(`server listening at http://localhost:${portNo}`))
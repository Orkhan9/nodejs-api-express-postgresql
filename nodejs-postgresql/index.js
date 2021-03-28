const express=require('express')
const app=express();
const pool=require('./db');

app.use(express.json()); // => req.body
//ROUTES//

//get all todos

//create a todo
app.post('/todos',async (req,res)=>{
    try{
        const {description}=req.body;
        const newTodo=await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *',
            [description]
        )
        res.json(newTodo.rows[0]);
    }catch (e) {
        console.error(e.message)
    }
})
//update a todo

//delete a todo

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})

const express=require('express')
const app=express();
const pool=require('./db');

app.use(express.json()); // => req.body
//ROUTES//

//get all todos
app.get('/todos',async (req,res)=>{
    try {
        const allTodos=await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows)
    }catch (e) {
        console.error(e.message)
    }
})
//get a todo
app.get('/todos/:id',async (req,res)=>{
    // console.log(req.params)
    const {id}=req.params;
    try {
        const todo=await pool.query('SELECT * FROM todo WHERE todo_id=$1',[id]);
        console.log(todo.rows)
        if(todo.rows.length>0){
            res.json(todo.rows[0]);
        }else{
            res.json(`${id} - id todo is not existed`)
        }

    }catch (e) {
        console.error(e.message);
    }
})
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
app.put('/todos/:id',async (req,res)=>{
    const {id}=req.params;
    const {description}=req.body;
    try {
        const updateTodo=await pool.query('UPDATE todo SET description=$1 WHERE todo_id=$2',[description,id]);
        // res.json('todo was updated');
        res.json('todo was updated');
    }catch (e) {
        console.error(e.message);
    }
})
//delete a todo
app.delete('/todos/:id',async (req,res)=>{
    const {id}=req.params;
    try {
        const deleteTodo=await pool.query('DELETE FROM todo WHERE todo_id=$1',[id])
        res.json(`${id}-id todo was deleted`);
    }catch (e) {
        console.error(e.message);
    }
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})

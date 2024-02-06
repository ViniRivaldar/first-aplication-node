const express = require('express')
const app = express()
const uuid= require('uuid')
const port = 3001
const cors = require('cors')



app.use(express.json())
app.use(cors())

const users = []

const checkUserId = (req, res, next) =>{
    const {id} = req.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return res.status(404).send("user not found")
    }

    req.userIndex = index
    req.userId = id
    next()    
}

app.get('/users',(request, response)=>{
    return response.json(users)
})

app.post('/users',(request, response)=>{
    const {name, age} = request.body


    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId,(request, response)=>{
    const {name, age} = request.body
    const id = request.userId
    const index= request.userIndex

    const updateUser = {id,name,age}

    

  
    users[index]= updateUser
    return response.json(updateUser)

})
app.delete('/users/:id', checkUserId,(request, response)=>{
 
    const index= request.userIndex


    users.splice(index,1)
    return response.status(204).json()

})


app.listen(port, ()=>{
    console.log(`server run on port ${port}`)
})




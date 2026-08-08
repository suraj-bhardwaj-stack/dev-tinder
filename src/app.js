const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user')

const app = express()
app.use(express.json())

app.post('/signup', async (req, res) =>{
    console.log(req)
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User is Added")
    }catch(err){
        res.status(400).send("User not added" + err)
    }
})

app.get('/user', async(req, res)=>{
    const findById = await User.find({email : req.body.email})
    try{
        res.send(findById)
    }catch(err){
        res.status(404).send('user not found' + err)
    }
})

app.get('/feed', async (req, res) =>{
    const user = await User.find()
    try{
    if(user.length > 0){
        res.send(user)
    }else{
        res.send('these in no user avalible')
    }
    }catch(err){
        res.status(400).send('user are not in DB'  + err)
    }
})

app.delete('/user' , async (req, res) => {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId)
    try{
        res.send("user is deleted")
    }catch(err){
        res.status(404).send("somthing went wrong" + err)
    }
})

app.patch("/user/:userId", async (req, res) =>{
   const userId = req.params.userId;
   const data = req.body
   try{
       const Allow_Updates = ["photoUrl", "skills", "bio", "age"]
       const isAllowUpdate = Object.keys(data).every((k) => Allow_Updates.includes(k))
       if(isAllowUpdate){
            const user = await User.findByIdAndUpdate({_id:userId} , data, {
            returnDocument : "after",
            runValidators : true, 
        }) 
        res.send("User is updated")
       }else{
        throw new Error('update failed')
       }
       
   }catch(err){
        res.status(404).send("Something went wrong" +  err)
   }
})

connectDB()
    .then(()=>{
        console.log('database is connected')
        app.listen(3000 , ()=>{
            console.log('server is running')
        })
    }).catch((err)=>{
        console.log("Database is not connected")
        console.error(err);
    })


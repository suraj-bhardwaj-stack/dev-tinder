const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://yatharth:AoYB9Nzh6xx62BFS@namastenode.ydngvul.mongodb.net/devTinder')
}

module.exports = connectDB;




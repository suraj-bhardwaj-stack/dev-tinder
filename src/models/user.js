const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique: true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
                
            }
        }

    },
    password : {
        type : String,
        minLength : 6,
        maxLength : 12,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password");
                
            }
        }
    },
    bio : {
        type : String,
        maxLength : 100

    },
    age : {
        type : Number,
        min: 18

    },
    gender : {
        type : String,
        validate(value){
            if(!["male" , "female", "other"].includes(value)){
                throw new Error("Gender not valid")
            }
        }
    },

    photoUrl : {
        type : String,
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter valid URL");
                
            }
        }
    },

    skills : {
        type : [String]
    }
} , {timestamps : true})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
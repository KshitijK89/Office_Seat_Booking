const mongoose = require('mongoose')

const UserSchema = new Schema(
    {
        email:{
            type : String,
            required : true,
            unique : true
        }
    }
);

const User = mongoose.model('User',)
/* Packages Call */ 

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User Schema 
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    }
})


const User = module.exports = mongoose.model('User' , UserSchema);


 /* Function that Schema can use */ 


module.exports.getUserById = (id , callback) => {
    User.findById(id , callback);
}



module.exports.getUserByUsername = (username , callback) => {
    const query = {username: username}
    User.findOne(query , callback);
}



module.exports.addUser = (user , callback) => {
bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(user.password , salt , (err , hash) => {
                user.password = hash;
                user.save(callback);
        })
})
}




module.exports.comparePassword = (actualPassword , hash , callback) => {
    bcrypt.compare(actualPassword , hash , (err , isMatch) => {
        callback(null , isMatch);

    })

}

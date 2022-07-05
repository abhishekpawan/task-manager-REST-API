const connectDB = require('./db/mongoose')
const User = require('../src/models/userModel')

connectDB()

// 62c3d7c3db1ce8cd5033ece6


// updating user and then found the number of user with age 1 with promise chaining Example
User.findByIdAndUpdate('62c15842730d788a18d3868a', {age:1}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})

//62c195f70ddf4412e07c6f59
// delete an task get and print the total numbeer of incomplete tasks
Task.findByIdAndDelete('62c3f8d405d9853c7a68978d').then((task)=>{
    console.log(task);
    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})
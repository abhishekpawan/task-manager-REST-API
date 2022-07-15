const express = require('express')
const connectDB = require('./db/mongoose')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const dotenv = require("dotenv").config();

connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})


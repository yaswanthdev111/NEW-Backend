const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/ConnectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()
// app.use(cors({
//     origin: [process.env.FRONTEND_URL, "http://localhost:3000", "https://livechat-frontend-ashen.vercel.app"], 
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     optionsSuccessStatus: 200,
//     preflightContinue: false

// }))

app.use(cors({
    origin: "*",
    credentials: true
}));

console.log("Allowed Origins:", process.env.FRONTEND_URL);

app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT
    })
})

//api endpoints
app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})
const express = require('express')
const urlRoute = require('./routes/url')
const {connectToMongoDb} = require('./connection.js')
const URL = require('./models/url')
const app = express()
const PORT = 8001


connectToMongoDb('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("MongoDB connected!")
})

app.use(express.json())
app.use('/url',urlRoute)

app.get('/:shortId',async (req,res)=>{
    const shortId =  req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory: {
            timeStamp: Date.now()
        }
    }})
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`)
})



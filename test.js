const express = require('express')

const app = express()

app.use('/:id', (req, res) => {
    res.send(req.params.id)
})

app.use('/', (req, res) => {
    res.send("Hi Index")
})

app.listen(3300, () => {
    console.log("Open Test Server")
})
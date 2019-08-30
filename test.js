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
/* 
    Temp
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/ulg/popper.min.js"
    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous">
</script>
*/
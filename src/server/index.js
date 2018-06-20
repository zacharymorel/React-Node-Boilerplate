const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static('dist/public'))
app.use((err, req, res, next) => {
  if(err)
    console.log(err.stack)
    res.status(500).send('Opps ERROR')
})

app.listen(port, console.log(`Listening on PORT: ${port}`))
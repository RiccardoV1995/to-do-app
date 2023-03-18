const express = require('express')
require('dotenv').config()

const dbConnect = require('./server/config/db')

const app = express()

dbConnect()

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users', require('./server/app/routes/UserRoute'))
app.use('/api/todos', require('./server/app/routes/TodoRoute'))
app.use('/api/categories', require('./server/app/routes/CategoryRoute'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname+'/client/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server run on port: ${PORT}`))
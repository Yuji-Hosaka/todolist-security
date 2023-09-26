require('dotenv').config()
const express = require('express')


const notFoundMiddleware = require('./middleware/notfound')
const errorMiddleware = require('./middleware/error')
const authRoute = require('./routes/auth-route')
const todoRoute = require('./routes/todo-route')

const app = express()

app.use(express.json())
app.use('/auth', authRoute)
app.use('/todo', todoRoute)


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('server running on port' + PORT)
})
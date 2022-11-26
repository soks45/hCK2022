const  express = require('express')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlerMiddleware')
const DbService = require('./services/dbConnect')

const app = express()
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)
const PORT = 8000

const start = async () => {
    try {
        await DbService.init()
        app.listen(PORT,() => console.log (`Server started port: ${PORT}`))
    }  catch (e) {
        console.log(e)
    }
}
start()

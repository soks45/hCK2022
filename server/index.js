require('dotenv').config()
const  express = require('express')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlerMiddleware')
const DbService = require('./services/dbConnect')
cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express()


app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)
app.use(cookieParser(process.env.SECRET_KEY))
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

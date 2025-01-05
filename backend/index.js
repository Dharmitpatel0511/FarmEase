import server from './src/app.js'
import connectDB from './src/db/connectDB.js'
import { configDotenv } from 'dotenv'

configDotenv({
    path:'./.env'
})


connectDB()


server.listen(process.env.PORT, () => {
    console.log(`Server is Listening on PORT : ${process.env.PORT}`)
})
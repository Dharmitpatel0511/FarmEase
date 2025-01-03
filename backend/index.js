import app from './src/app.js'
import connectDB from './src/db/connectDB.js'
import { configDotenv } from 'dotenv'

configDotenv({
    path:'./.env'
})


connectDB()


app.listen(process.env.PORT, () => {
    console.log(`App is Listening on PORT : ${process.env.PORT}`)
})
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url'
import userRouter from './routes/user.route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.static(path.join(__dirname.split('\src')[0],'public')))

app.use(cookieParser())



//routes

app.use('/user',userRouter)



export default app
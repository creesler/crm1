import express from 'express'
import dotenv from 'dotenv'
import roomRouter from './routes/roomRouter.js'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
// import projectRouter from './routes/projectRouter.js'
import cors from 'cors'

dotenv.config()


const port = process.env.PORT || 5000


const app = express()

app.use(
    cors({
        origin: "https://crmmva.netlify.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true

}))

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

app.use(express.json({limit:'10mb'}))
app.use('/user', userRouter);
app.use('/room', roomRouter);
// app.use('/project', projectRouter);
app.get('/', (req, res)=>res.json({message:'Welcome to our API'}))
app.use((req, res)=>res.status(404).json({success:false, message:'Not Found'}))


const startServer = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);  
        app.listen(port, ()=>console.log(`Server is listening on port:${port}`))
    } catch (error) {
        console.log(error)
    }
}

startServer();

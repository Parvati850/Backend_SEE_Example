import express from 'express';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import ecommerceRoutes from './routes/ecommerceRoutes.mjs';

const app = express()
app.use(express.json())
connectDB()

app.use('/api/user',userRoutes)
app.use('/api/ecomm',ecommerceRoutes)

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})
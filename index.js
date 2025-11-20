const express=require('express')
const base64=require('base-64')
const mongoose=require('mongoose')
const router = require('./Routes/UserRoutes')
const session=require('express-session')
const cors=require('cors')
const blogRouter = require('./Routes/BlogRoutes')
require('dotenv').config()

const app=express()

mongoose.connect(process.env.MONGO_URL)
.then(res=>{
    console.log('Connected to MongoDB Sever')
})
.catch(err=>{
    console.log('Error occured',err)
})

const allowedOrigins = [
  "https://mern-stack-blogging.vercel.app",
  "https://mern-stack-blogging-git-main-dale-harshithas-projects.vercel.app",
  "http://localhost:5173/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,          // REQUIRED on Render (HTTPS)
    httpOnly: true,
    sameSite: "none",      // REQUIRED for cross-domain cookies
    maxAge: 1000 * 60 * 60 * 24
  }
}));


app.use('/api',router)
app.use('/api',blogRouter)

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})

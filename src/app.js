import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors( {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json({limit: "16kb"})); // Middleware to parse JSON bodies
app.use(express.urlencoded({extended: true, limit: "16kb"})); // Middleware to parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Middleware to parse cookies from users browser for crud operations

// import routes
import userRoutes from './routes/user.routes.js';

// routes declaration
app.use('/api/v1/users', userRoutes);

// http://localhost:8000/api/v1/users/register

export {app}; 
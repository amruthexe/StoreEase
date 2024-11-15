import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';

const app: Application = express();

// Middleware for parsing JSON and logging requests
app.use(express.json());
app.use(morgan('dev'));

// CORS configuration for production
app.use(
  cors({
    origin: [
      'https://store-ease-w2i4.vercel.app', // Frontend domain in production
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials if needed
  })
);

// Routes and middleware
app.use('/api/v1', rootRouter);
app.use(globalErrorHandler);
app.use(notFound);

export default app;

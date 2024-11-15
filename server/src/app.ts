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
app.use(cors()); // This will allow all origins


// Routes and middleware
app.use('/api/v1', rootRouter);
app.use(globalErrorHandler);
app.use(notFound);

export default app;

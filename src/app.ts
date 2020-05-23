import express, { Application } from 'express';

import authRoutes from './routes/auth';
import './database';

const app: Application = express();


app.set('port', process.env.PORT || 5000);

app.use(express.json())


app.use('/api/auth/', authRoutes);

export default app;
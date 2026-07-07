import express from 'express';
import indexRouter from './routes/index.routes.js';
import { requestLogger } from './middlewares/requestLogger.middleware.js';
import { notFoundHandler } from './middlewares/notFoundHandler.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/api', indexRouter);

// Debe ir después de las rutas: captura cualquier ruta no definida.
app.use(notFoundHandler);

// Debe ir al final: captura cualquier error lanzado en rutas/controladores.
app.use(errorHandler);

export default app;

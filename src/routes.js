import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/products', ProductController.index);

routes.use(authMiddleware); // só vale para as proximas rotas abaixo

routes.put('/users', UserController.update);

export default routes;

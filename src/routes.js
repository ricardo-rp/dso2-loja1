import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); // cadastrar usuario
routes.post('/sessions', SessionController.store); // logar usuario
routes.post('/products', ProductController.store); // cadastrar produto
routes.get('/products', ProductController.index); // mostrar produto no carrinho

routes.use(authMiddleware); // só vale para as proximas rotas abaixo

routes.put('/users', UserController.update); // atualizacoes de dados do usuario

export default routes;

import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionsController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

export default routes;

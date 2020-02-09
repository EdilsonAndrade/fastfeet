import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileUploadController from './app/controllers/FileUploadController';
import OrderController from './app/controllers/OrderController';
import DeliveryManagementController from './app/controllers/DeliveryManagementController';
import OrderProblemController from './app/controllers/OrderProblemController';


const routes = new Router();

const upload = multer(multerConfig);
routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.get('/deliveryman/:deliveryManId/orders', OrderController.index);
routes.put('/deliveryman/:deliveryManId/orders/:orderId', DeliveryManagementController.update);

routes.put('/files/:orderId', upload.single('file'), FileUploadController.update);

routes.post('/order/:orderId/problems', OrderProblemController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);
routes.get('/recipients', RecipientController.index);

routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:deliveryManId', DeliveryManController.update);
routes.delete('/deliveryman/:deliveryManId', DeliveryManController.delete);
routes.get('/deliveryman', DeliveryManController.index);
routes.post('/files/:deliveryManId', upload.single('file'), FileUploadController.store);

routes.post('/orders', OrderController.store);
routes.put('/orders/:orderId', OrderController.update);
routes.delete('/orders/:orderId', OrderController.delete);
routes.get('/orders', OrderController.index);

routes.get('/order/:orderId/problems', OrderProblemController.index);


export default routes;

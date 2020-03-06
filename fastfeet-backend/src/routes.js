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
import DeliveryFinishController from './app/controllers/DeliveryFinishController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.get('/deliveryman/:deliveryManId/orders', OrderController.index);
routes.put('/deliveryman/:deliveryManId/deliverymanagements/:orderId', DeliveryManagementController.update);
routes.get('/deliveryman/:deliveryManId', DeliveryManController.index);
routes.put('/orders/:orderId/enddelivery', upload.single('signature'), DeliveryFinishController.update);
routes.post('/orders/:orderId/problems', OrderProblemController.store);
routes.get('/orders/:orderId/problems', OrderProblemController.index);

routes.use(authMiddleware);
routes.delete('/orders/:orderId/problems', OrderProblemController.delete);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);
routes.get('/recipients', RecipientController.index);

routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:deliveryManId', DeliveryManController.update);
routes.delete('/deliveryman/:deliveryManId', DeliveryManController.delete);
routes.get('/deliveryman', DeliveryManController.index);

routes.post('/files', upload.single('file'), FileUploadController.store);

routes.post('/orders', OrderController.store);
routes.put('/orders/:orderId', OrderController.update);
routes.delete('/orders/:orderId', OrderController.delete);
routes.get('/orders', OrderController.index);

routes.get('/problems', OrderProblemController.index);


export default routes;

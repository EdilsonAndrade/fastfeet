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
// free routes - sessions
routes.post('/sessions', SessionController.store);

// free routes - users
routes.post('/users', UserController.store);

// free routes - deliveryman
routes.get('/deliveryman/:deliveryManId/orders', OrderController.index);
routes.put('/deliveryman/:deliveryManId/orders/:orderId', DeliveryManagementController.update);
routes.get('/deliveryman/:deliveryManId', DeliveryManController.index);
// free routes - user signature file route for order
routes.put('/files/:orderId', upload.single('file'), FileUploadController.update);

// free routes - order problem
routes.post('/orders/:orderId/problems', OrderProblemController.store);

routes.use(authMiddleware);

// recipients routes
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);
routes.get('/recipients', RecipientController.index);

// deliveryman routes
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:deliveryManId', DeliveryManController.update);
routes.delete('/deliveryman/:deliveryManId', DeliveryManController.delete);
routes.get('/deliveryman', DeliveryManController.index);
routes.post('/files', upload.single('file'), FileUploadController.store);

// orders route
routes.post('/orders', OrderController.store);
routes.put('/orders/:orderId', OrderController.update);
routes.delete('/orders/:orderId', OrderController.delete);
routes.get('/orders', OrderController.index);
routes.get('/orders/:orderId/problems', OrderProblemController.index);
routes.get('/problems', OrderProblemController.index);


export default routes;

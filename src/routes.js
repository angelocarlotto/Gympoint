import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import EnrrollmentController from './app/controllers/EnrrollmentController';
import HelpOrderPlanController from './app/controllers/HelpOrderPlanController';

import CheckinController from './app/controllers/CheckinController';
import PlanController from './app/controllers/PlanController';
import authMiddleWares from './app/middlewares/auth';

const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:student_id/help-orders', HelpOrderPlanController.index);
routes.post('/students/:student_id/help-orders', HelpOrderPlanController.store);

routes.use(authMiddleWares);

routes.put('/users', UserController.update);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.put('/students/:student_id/answer', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrrollments', EnrrollmentController.index);
routes.post('/enrrollments', EnrrollmentController.store);
routes.put('/enrrollments', EnrrollmentController.update);
routes.delete('/enrrollments/:id', EnrrollmentController.delete);

export default routes;

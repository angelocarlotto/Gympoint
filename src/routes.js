import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import EnrrollmentController from './app/controllers/EnrrollmentController';
import PlanController from './app/controllers/PlanController';
import authMiddleWares from './app/middlewares/auth';

const routes = new Router();
routes.get('/lalala',(req,res)=>{
    return res.json({msg:"rodrigo lindo"});
})
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleWares);

routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans', PlanController.update);
routes.delete('/plans', PlanController.delete);

routes.get('/enrrollments', EnrrollmentController.index);
routes.get('/enrrollments', EnrrollmentController.index);
routes.put('/enrrollments', EnrrollmentController.update);
routes.delete('/enrrollments', EnrrollmentController.delete);

export default routes;

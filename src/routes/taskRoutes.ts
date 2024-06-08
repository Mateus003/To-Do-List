import express from 'express';
import TaskController from '../controller/taskController';


const router = express.Router();


router.get('/', TaskController.showTasks);
router.get('/add', TaskController.createTask);
router.post('/add', TaskController.createTaskSave);
router.get('/edit/:id', TaskController.updateTask);
router.post('/edit', TaskController.updateTaskPost);
router.delete('/delete/:id', TaskController.deleteTask);
router.post('/updatestatus', TaskController.toggleTaskStatus);

export default router;

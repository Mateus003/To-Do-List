import express from 'express';
import MemberController from '../controller/memberController';
import authenticateJWT from '../middleware/authenticateJWT';


const router = express.Router();

// Rotas
router.get('/register', MemberController.createMember);
router.post('/register', MemberController.createMemberSave);

router.get('/login', MemberController.login);
router.post('/login', MemberController.loginSave); 
router.get('/home',MemberController.home); 
export default router;
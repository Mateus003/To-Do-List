import express from 'express';
import MemberController from '../controller/memberController';


const router = express.Router();


router.get('/register', MemberController.createMember);
router.post('/register', MemberController.createMemberSave);

router.get('/login', MemberController.login);
router.post('/login', MemberController.loginSave); 

router.get('/home', MemberController.home); 
export default router;
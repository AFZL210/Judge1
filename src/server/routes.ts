import express from 'express';
const router = express.Router();
import * as codeController from './controllers/code_controller';
import * as userController from './controllers/user_controller';

router.post('/execute', codeController.executeCode);
router.post('/createuser', userController.createUser);

export default router;
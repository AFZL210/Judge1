import express from 'express';
const router = express.Router();
import * as codeController from './controllers/code_controller';

router.post('/execute', codeController.executeCode);

export default router;
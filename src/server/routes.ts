import express from "express";
const router = express.Router();
import * as codeController from "./controllers/code_controller";
import * as userController from "./controllers/user_controller";
import * as middleware from "./middleware";

router.post("/execute", middleware.authMiddleware, codeController.executeCode);
router.get('/result', middleware.authMiddleware, codeController.result);
router.post("/createuser", userController.createUser);

export default router;

import express from "express";
import { registerController ,loginController,getAllUsers} from "../controller/user.controller.js";
const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users", getAllUsers);
export default router;
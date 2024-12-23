import express from "express"
import { protectRoute } from "../middleware/protect.middleware.js";
import {getUsers,getMsg,sendMessage} from "../controllers/message.controller.js"

const router = express.Router();

router.get("/users", protectRoute, getUsers)
router.get("/:id",protectRoute,getMsg)
router.post("/send/:id",protectRoute,sendMessage)

export default router
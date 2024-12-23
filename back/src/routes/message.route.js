import express from "express"
import { protectRoute } from "../middleware/protect.middleware.js";
import {getUsers,getMsg} from "../controllers/message.controller.js"

const router = express.Router();

router.get("/users", protectRoute, getUsers)
router.get("/:id",protectRoute,getMsg)

export default router
import express from 'express'
import { addNewTask, deleteTask, getAllTask, updateTask } from '../controller/taskController.js'
const router = express.Router()


router.get("/", getAllTask)

router.post("/", addNewTask)

router.put("/:id", updateTask)

router.delete("/:id", deleteTask)

export default router;

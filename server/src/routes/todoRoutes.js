import express from 'express';
import { getTodos, createTodo, deleteTodo } from '../controllers/todoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);

export default router;
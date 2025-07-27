import Todo from '../models/Todo.js';

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const todo = new Todo({ ...req.body, userId: req.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
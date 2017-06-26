import { Router } from 'express';
const router = new Router();

const todos = [];

router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  if (req.body && req.body.todo) {
    todos.push(req.body.todo);
  }
  res.send(todos);
});

router.post('/:index', (req, res) => {
  const index = req.params.index;
  if (todos[index]) {
    todos[index].done = !todos[index].done;
  }
  res.send(todos);
});

router.delete('/:index', (req, res) => {
  const index = req.params.index;
  if (todos[index]) {
    todos.splice(index, 1);
  }
  res.send(todos);
});

export default router;

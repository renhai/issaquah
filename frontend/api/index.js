import { Router } from 'express';
import bodyParser from 'body-parser';
import todos from './todos';

const api = new Router();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json({ extended: true }));
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

api.use('/todos', todos);

export default api;

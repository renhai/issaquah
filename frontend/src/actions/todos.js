import * as todoApi from '../apis/todosApis';

export const UPDATE_TODOS = 'todo/UPDATE_TODOS';

function updateTodos(todos) {
  return {
    type: UPDATE_TODOS,
    payload: { todos },
  };
}

export function fetchTodos() {
  return async (dispatch, getState, { http }) => {
    const { data: todos } = await http.request(todoApi.findAll());
    return dispatch(updateTodos(todos));
  };
}

export function addTodo(todo) {
  return async (dispatch, getState, { http }) => {
    const { data: todos } = await http.request(todoApi.save({ content: todo }));
    return dispatch(updateTodos(todos));
  };
}

export function removeTodo(index) {
  return async (dispatch, getState, { http }) => {
    const { data: todos } = await http.request(todoApi.remove(index));
    return dispatch(updateTodos(todos));
  };
}

export function doneTodo(index) {
  return async (dispatch, getState, { http }) => {
    const { data: todos } = await http.request(todoApi.done(index));
    return dispatch(updateTodos(todos));
  };
}

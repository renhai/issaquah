export function findAll() {
  return {
    url: '/todos',
  };
}

export function save(todo) {
  return {
    url: '/todos',
    method: 'post',
    data: { todo },
  };
}

export function done(index) {
  return {
    url: `/todos/${index}`,
    method: 'post',
  };
}

export function remove(index) {
  return {
    url: `/todos/${index}`,
    method: 'delete',
  };
}

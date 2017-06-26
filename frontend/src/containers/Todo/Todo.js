import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos, addTodo, removeTodo, doneTodo } from '../../actions/todos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const stateToProps = state => ({
  todos: state.todo.todos,
});

const actionToProps = {
  onLoad: fetchTodos,
  onSubmit: addTodo,
  onClickDone: doneTodo,
  onClickRemove: removeTodo,
};

@connect(stateToProps, actionToProps)
export default class Todo extends React.Component {
  props: {
    todos: Array,
    onLoad: () => void,
    onSubmit: (todo: {}) => void,
    onClickDone: (index: number) => void,
    onClickRemove: (index: number) => void
  };

  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  render() {
    const { todos, onSubmit, onClickDone, onClickRemove } = this.props;
    return (
      <div className="columns is-mobile">
        <section className="column is-half is-offset-3">
          <h1 className="title">Todo List</h1>
          <TodoForm onSubmit={onSubmit} />
          <br />
          {todos.map((todo, key) =>
            (<TodoItem
              key={key}
              todo={todo}
              onClickDone={() => onClickDone && onClickDone(key)}
              onClickRemove={() => onClickRemove && onClickRemove(key)}
            />))}
        </section>
      </div>
    );
  }
}

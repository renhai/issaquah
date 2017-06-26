import React from 'react';

export default class TodoForm extends React.Component {
  props: {
    onSubmit: () => void
  };

  state: {
    todo: string
  };

  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    };
  }

  handleChangeInput = (event) => {
    const { target: { value } } = event;
    this.setState({ todo: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.todo);
    this.setState({ todo: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="add-todo-input" className="label">Add Todo</label>
        <p className="control has-addons">
          <input
            id="add-todo-input"
            name="todo"
            value={this.state.todo}
            onChange={this.handleChangeInput}
            className="input"
            type="text"
            placeholder="Add Todo Here"
          />
          <input type="submit" className="button is-primary" value="Submit" />
        </p>
      </form>
    );
  }
}

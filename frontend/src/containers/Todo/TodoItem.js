import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(require('./Todo.css'));

type PropTypes = {
  todo: {
    content: string,
    done?: boolean,
  },
  onClickDone: () => void,
  onClickRemove: () => void
};

export default function TodoItem(props: PropTypes) {
  return (
    <div className="card is-fullwidth">
      <div className="card-content">
        <div className={cx('content', { done: props.todo.done })}>
          {props.todo.content}
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item" onClick={props.onClickDone}>Done</a>
        <a className="card-footer-item" onClick={props.onClickRemove}>Delete</a>
      </footer>
    </div>
  );
}

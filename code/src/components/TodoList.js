/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todos } from 'reducers/todo';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';

export const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((store) => store.todos.items);

  const onDone = (id) => {
    dispatch(todos.actions.toggleItem(id));
  };

  const onDelete = (todoIndex) => {
    dispatch(todos.actions.deleteItem(todoIndex));
  };

  const onCompleteAll = () => {
    allTodos.forEach((todo) => {
      if (!todo.isDone) {
        dispatch(todos.actions.toggleItem(todo.id));
      }
    });
  };

  const onClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      dispatch(todos.actions.clearAll());
    }
  };

  const todosTodo = allTodos.filter((todo) => !todo.isDone);
  const doneTodos = allTodos.filter((todo) => todo.isDone);

  return (
    <>
      <h2>To-do ({todosTodo.length})</h2>

      {todosTodo.length === 0 && <p>You are all done! ⭐</p>}

      {todosTodo.map((todo, index) => (
        <TodoItem todo={todo} index={index} key={todo.id} onDelete={onDelete} onDone={onDone} />
      ))}

      <AddTodo />

      <h2>Done ({doneTodos.length})</h2>

      <button type="button" onClick={onCompleteAll}>
        Complete all
      </button>

      <button type="button" onClick={onClearAll}>
        Clear all
      </button>

      {doneTodos.map((todo, index) => (
        <TodoItem todo={todo} index={index} key={todo.id} onDelete={onDelete} onDone={onDone} />
      ))}
    </>
  );
};

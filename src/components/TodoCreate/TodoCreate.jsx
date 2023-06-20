import { useTodoDispatch, useTodoNextId } from '@/context';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function TodoCreate({ createTodo }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  // const dispatch = useTodoDispatch();
  // const nextId = useTodoNextId();

  const token = localStorage.getItem('token');
  const url = 'http://localhost:8000/';
  const api = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      todo: value,
    };
    createTodo(todoData);
    setValue('');
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div>
          <form onSubmit={onSubmit}>
            <input
              data-testid="new-todo-input"
              placeholder="Enter 혹은 버튼 클릭"
              onChange={onChange}
              value={value}
            />
            <button>생성</button>
          </form>
        </div>
      )}
      <button data-testid="new-todo-add-button" onClick={onToggle} open={open}>
        추가
      </button>
    </>
  );
}

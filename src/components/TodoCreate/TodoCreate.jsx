import { useTodoDispatch, useTodoNextId } from '@/context';
import { useState } from 'react';
import axios from 'axios';

export function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const token = localStorage.getItem('token');
  const url = 'http://localhost:8000/';
  const api = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const createTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      const createdTodo = response.data;
      dispatch({ type: 'CREATE', todo: createdTodo });
      console.log(createdTodo);
    } catch (error) {
      console.log(console.error());
    }
  };

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      id: nextId.current,
      todo: value,
      isCompleted: false,
    };
    createTodo(todoData);
    setValue('');
    setOpen(false);
    nextId.current += 1;
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

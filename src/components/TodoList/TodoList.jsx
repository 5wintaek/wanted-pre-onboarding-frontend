import { useTodoState } from '@/context';
import { TodoItem, TodoCreate } from '@/components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');
const url = 'http://localhost:8000/';
const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function TodoList() {
  const [todos, setTodos] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  const createTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      const createdTodo = response.data;
      // dispatch({ type: 'CREATE', todo: createdTodo });
      console.log(createdTodo);
      getTodos();
    } catch (error) {
      console.log(console.error());
    }
  };

  const getTodos = async () => {
    try {
      const response = await api.get('/todos');
      const todosData = response.data;
      setTodos(todosData);
      console.log(todosData, '구분');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
      <TodoCreate createTodo={createTodo} />
    </ul>
  );
}

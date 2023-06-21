import { TodoList } from '@/components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Todo({ token }) {
  return (
    <>
      <h2>✏️ Todo List</h2>
      <TodoList />
    </>
  );
}

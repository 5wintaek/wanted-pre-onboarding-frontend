import { TodoList } from '@/components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Todo({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  });
  return (
    <>
      <h2>✏️ Todo List</h2>
      <TodoList />
    </>
  );
}

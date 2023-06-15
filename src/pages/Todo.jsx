import { TodoForm } from '@/components/TodoForm/TodoForm';
import { useTodoState } from '@/context';

export function Todo() {
  const todos = useTodoState();
  console.log(todos);
  return (
    <>
      <h2>✏️ Todo List</h2>
      <TodoForm />
    </>
  );
}

import { TodoList } from '@/components';
import { useTodoState } from '@/context';

export function Todo() {
  const todos = useTodoState();
  console.log(todos);
  return (
    <>
      <h2>✏️ Todo List</h2>
      <TodoList />
    </>
  );
}

import { useTodoState } from '@/context';
import { TodoItem, TodoCreate } from '@/components';

export function TodoList() {
  const todos = useTodoState();

  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          done={todo.done}
        />
      ))}
      <TodoCreate />
    </>
  );
}

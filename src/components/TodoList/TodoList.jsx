import { TodoItem, TodoCreate } from '@/components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PROD_ADDRESS } from '@/api/api';

const token = localStorage.getItem('token');
const url = { PROD_ADDRESS };
const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export function TodoList() {
  const [todos, setTodos] = useState();
  const [isEditing, setEditing] = useState(false);
  const [pickedIndex, setPickedIndex] = useState(-1);

  useEffect(() => {
    getTodos();
  }, []);

  const onRemove = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      console.log(response);
      getTodos();
    } catch (error) {
      console.log(console.error());
    }
  };

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

  // toggle 버튼으로 할일 체크박스
  const onToggle = async (todo) => {
    console.log(todo, 'todo');
    try {
      let response = await api.put(`/todos/${todo.id}`, {
        isCompleted: !todo.isCompleted,
        todo: todo.todo,
      });
      // 서버 응답받아 추가처리
      console.log(response.data);
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelEdit = () => {
    setEditing(false);
    // setEditValue(todos);
    // getTodos();
    // console.log('hi');
  };

  const onSaveEdit = async (todo, editValue) => {
    console.log(todo, 'todo 가 뭘까');
    console.log(editValue, 'editValue');
    try {
      let response = await api.put(`/todos/${todo.id}`, {
        isCompleted: todo.isCompleted,
        todo: editValue,
      });
      console.log(response.data);
      // id 까지 전달해야지만 할일이 업데이트가 되고 화면에 렌더링이 된다.
      setEditing(false);
      getTodos();
    } catch (error) {
      console.log(console.error());
    }
  };

  return (
    <ul>
      {todos?.map((todo, index) => (
        <TodoItem
          index={index}
          onToggle={onToggle}
          onRemove={onRemove}
          todo={todo}
          key={todo.id}
          isEditing={isEditing}
          setEditing={setEditing}
          getTodos={getTodos}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          pickedIndex={pickedIndex}
          setPickedIndex={setPickedIndex}
        />
      ))}
      <TodoCreate createTodo={createTodo} />
    </ul>
  );
}

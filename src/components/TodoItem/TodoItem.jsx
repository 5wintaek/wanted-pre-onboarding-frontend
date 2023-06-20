import React, { useState, useEffect } from 'react';
import { useTodoDispatch } from '@/context';
import styled from 'styled-components';
import axios from 'axios';

const ListStyle = styled.li`
  list-style: none;
`;

const CheckBox = styled.input`
  border: 1 px solid #fffff;
  border-radius: 16px;
  cursor: pointer;
`;

const token = localStorage.getItem('token');
const url = 'http://localhost:8000/';
const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const TodoItem = React.memo(({ todo }) => {
  // const dispatch = useTodoDispatch();
  const [isEditing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);

  useEffect(() => {
    console.log(todo, 'todo');
  });

  // // toggle 버튼으로 할일 체크박스
  // const onToggle = async () => {
  //   try {
  //     let response = await api.put(`/todos/${id}`, {
  //       isCompleted: !isCompleted,
  //       todo: todo,
  //     });
  //     // 서버 응답받아 추가처리
  //     console.log(response.data);
  //     dispatch({ type: 'TOGGLE', id });
  //   } catch (error) {
  //     console.log(console.error(error));
  //   }
  // };

  // const onRemove = async () => {
  //   try {
  //     const response = await api.delete(`/todos/${id}`);
  //     console.log(response);
  //     dispatch({ type: 'REMOVE', id });
  //   } catch (error) {
  //     console.log(console.error());
  //   }
  // };

  // const onEdit = () => {
  //   setEditing(true);
  // };

  // const onCancelEdit = () => {
  //   setEditValue(todo);
  //   setEditing(false);
  // };

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await api.get('/todos');
  //       const todosData = response.data;
  //       dispatch({ type: 'EDIT', todos: todosData });
  //       console.log(todosData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchTodos();
  // }, [dispatch]);

  // const onSaveEdit = async () => {
  //   try {
  //     const response = await api.put(`/todos/${id}`, {
  //       todo: editValue,
  //       isCompleted,
  //     });
  //     console.log(response.data);
  //     // id 까지 전달해야지만 할일이 업데이트가 되고 화면에 렌더링이 된다.
  //     dispatch({ type: 'EDIT', todo: editValue, id });
  //     setEditing(false);
  //   } catch (error) {
  //     console.log(console.error());
  //   }
  // };

  const onChangeEdit = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <ListStyle>
      <label>
        <CheckBox type="checkbox" />
        <input
          value={editValue}
          onChange={(e) => onChangeEdit(e)}
          type="text"
        />
        <button data-testid="submit-button">저장</button>
        <button data-testid="cancel-button">삭제</button>
        {/* <ListStyle>
        <label>
          <CheckBox
            isCompleted={isCompleted}
            type="checkbox"
            // onClick={onToggle}
          />
          {isEditing ? (
            <>
              <input
                data-testid="modify-input"
                type="text"
                value={editValue}
                // onChange={onChangeEdit}
              />
              
            </>
          ) : (
            <>
              <span>{todo}</span>
              <button>수정</button>
              <button data-testid="delete-button">삭제</button>
            </>
          )}
        </label>
      </ListStyle> */}
      </label>
    </ListStyle>
  );
});

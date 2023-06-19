import React, { useState } from 'react';
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

export const TodoItem = React.memo(({ id, isCompleted, todo }) => {
  const dispatch = useTodoDispatch();
  // const onToggle = () => dispatch({ type: 'TOGGLE', id });
  // const onRemove = () => dispatch({ type: 'REMOVE', id });
  const [isEditing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo);

  const onToggle = async () => {
    try {
      const response = await api.put(`/todos/${id}`, {
        isCompleted: !isCompleted,
        todo: todo,
      });
      // 서버 응답받아 추가처리
      console.log(response.data);
      dispatch({ type: 'TOGGLE', id });
    } catch (error) {
      console.log(console.error(error));
    }
  };

  // const onRemove = async () => {
  //   try{
  //     const response = await axios.delete('/api/')
  //   }
  // }

  const onEdit = () => {
    setEditing(true);
  };

  const onCancelEdit = () => {
    setEditValue(todo);
    setEditing(false);
  };

  const onSaveEdit = () => {
    dispatch({
      type: 'EDIT',
      id,
      todo: editValue,
    });
    setEditing(false);
  };

  const onChangeEdit = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <div>
      <ListStyle>
        <label>
          <CheckBox
            isCompleted={isCompleted}
            type="checkbox"
            onClick={onToggle}
          />
          {isEditing ? (
            <>
              <input type="text" value={editValue} onChange={onChangeEdit} />
              <button onClick={onSaveEdit}>저장</button>
              <button onClick={onCancelEdit}>취소</button>
            </>
          ) : (
            <>
              <span>{todo}</span>
              <button onClick={onEdit}>수정</button>
              <button data-testid="delete-button">삭제</button>
            </>
          )}
        </label>
      </ListStyle>
    </div>
  );
});

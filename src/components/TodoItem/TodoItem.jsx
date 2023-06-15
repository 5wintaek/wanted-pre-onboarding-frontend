import React, { useState } from 'react';
import { useTodoDispatch } from '@/context';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const ListStyle = styled.li`
  list-style: none;
`;

const CheckBox = styled.input`
  border: 1 px solid #fffff;
  border-radius: 16px;
  cursor: pointer;
`;

export const TodoItem = React.memo(({ id, done, todo }) => {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  const [isEditing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo);

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
          <CheckBox done={done.toString()} type="checkbox" onClick={onToggle} />
          {isEditing ? (
            <>
              <input type="text" value={editValue} onChange={onChangeEdit} />
              <button onClick={onSaveEdit}>저장</button>
              <button onClick={onCancelEdit}>취소</button>
            </>
          ) : (
            <>
              <span done={done.toString()}>{todo}</span>
              <button onClick={onEdit}>수정</button>
            </>
          )}
        </label>
        <button data-testid="delete-button" onClick={onRemove}>
          삭제
        </button>
      </ListStyle>
    </div>
  );
});

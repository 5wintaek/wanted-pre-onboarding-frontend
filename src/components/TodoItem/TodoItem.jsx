import React from 'react';
import { useTodoDispatch } from '@/context';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const ListStyle = styled.li`
  list-style: none;
`;

const Remove = styled.button`
  color: #dee2e6;
  font-size: 24px;
  /* opacity: 0; */
  &hover {
    color: #ff6b6b;
  }
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

  return (
    <div>
      <ListStyle>
        <label>
          <CheckBox done={done.toString()} type="checkbox" onClick={onToggle} />
          <span done={done.toString()}>{todo}</span>
        </label>
        <Remove data-testid="delete-button" onClick={onRemove}>
          <MdDelete />
        </Remove>
      </ListStyle>
    </div>
  );
});

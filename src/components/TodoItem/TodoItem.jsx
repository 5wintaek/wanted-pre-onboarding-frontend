import React, { useState, useEffect } from 'react';
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

export const TodoItem = React.memo(
  ({
    todo,
    onRemove,
    onToggle,
    isEditing,
    setEditing,
    onCancelEdit,
    onSaveEdit,
    pickedIndex,
    setPickedIndex,
    index,
  }) => {
    const [editValue, setEditValue] = useState(todo.todo);

    useEffect(() => {
      // console.log(todo, 'todo');
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

    // const onEdit = () => {
    //   setEditing(true);
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
      console.log('onChangeEdit');
    };

    useEffect(() => {
      console.log(editValue);
    });

    return (
      <ListStyle>
        {/* <label> */}
        <CheckBox
          onChange={() => {
            onToggle(todo);
          }}
          type="checkbox"
          checked={todo.isCompleted} // value 와 같이 명시해줌
        />
        {isEditing && index === pickedIndex ? (
          <>
            <input
              data-testid="modify-input"
              value={editValue || ''}
              onChange={(e) => onChangeEdit(e)}
              type="text"
            />
            <button
              data-testid="submit-button"
              onClick={() => {
                onSaveEdit(todo, editValue);
              }}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => {
                onCancelEdit();
              }}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <input disabled value={todo.todo || ''} type="text" />
            <button
              onClick={() => {
                setEditing(true);
                setPickedIndex(index);
              }}
              data-testid="modify-button"
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={() => {
                onRemove(todo.id);
              }}
            >
              삭제
            </button>
          </>
        )}

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
        {/* </label> */}
      </ListStyle>
    );
  }
);

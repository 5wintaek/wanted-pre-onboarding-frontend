import { useTodoDispatch, useTodoNextId } from '@/context';
import { useState } from 'react';

export function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        todo: value,
        done: false,
      },
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <div>
          <form onSubmit={onSubmit}>
            <input
              data-testid="new-todo-input"
              placeholder="Enter 혹은 버튼 클릭"
              onChange={onChange}
              value={value}
            />
            <button>생성</button>
          </form>
        </div>
      )}
      <button data-testid="new-todo-add-button" onClick={onToggle} open={open}>
        추가
      </button>
    </>
  );
}

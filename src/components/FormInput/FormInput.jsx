import { useId } from 'react';

export function FormInput({ type, ...restProps }) {
  const id = useId();

  return <input type={type} id={id} {...restProps} />;
}

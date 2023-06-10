import { useRef } from 'react';
import { FormInput, LoginButton } from '@/components';
import { AuthForm } from '@/components/AuthForm/AuthForm';

const initialFormState = {
  email: '',
  password: '',
};

export function SignInPage() {
  const formState = useRef(initialFormState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    formState.current[name] = value;
    console.log(name);
  };

  return <AuthForm />;
}

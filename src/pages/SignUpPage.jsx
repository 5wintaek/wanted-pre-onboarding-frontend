import axios from 'axios';
import { useState } from 'react';
import { DEV_ADDRESS } from '@/api/api';
import { AuthForm } from '@/components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import { FormInput, LoginButton } from '@/components';

export function SignUpPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(DEV_ADDRESS);
    try {
      const response = await axios.post(`${DEV_ADDRESS}/auth/signup`, {
        email,
        password,
      });
      setIsRegistered(() => true);
    } catch (error) {
      alert(error.response.data.message);
    }
    if (isRegistered) {
      navigate('/signin');
    }
  };

  const handleChnageInputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChnageInputPassWord = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        data-testid="password-input"
        name="eamil"
        type="email"
        onChange={handleChnageInputEmail}
      />
      <FormInput
        data-testid="password-input"
        name="password"
        type="password"
        onChange={handleChnageInputPassWord}
      />
      <LoginButton type="submit">회원가입</LoginButton>
    </form>
  );
}

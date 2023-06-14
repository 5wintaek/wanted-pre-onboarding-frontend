import { useInput } from '@/hooks';
import { FormInput, LoginButton } from '@/components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:8000/';
const api = axios.create({
  baseURL: url,
  Headers: {
    'Content-Type': 'application/json',
  },
});

export function SignInPage() {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    const validateEmail = (email) => {
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    };
    const validatePassword = (password) => {
      return password.length >= 8;
    };

    const isValidEmail = validateEmail(emailInput.value);
    const isValidPassword = validatePassword(passwordInput.value);

    setValid(isValidEmail && isValidPassword);
  }, [emailInput.value, passwordInput.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signin', {
        email: emailInput.value,
        password: passwordInput.value,
      });

      console.log(res);
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      console.log('성공');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eamil">Email : </label>
      <FormInput
        data-testid="email-input"
        name="email"
        type="email"
        value={emailInput.value}
        {...emailInput}
      />
      <label htmlFor="password">Password : </label>
      <FormInput
        data-testid="password-input"
        name="password"
        type="password"
        value={passwordInput.value}
        {...passwordInput}
      />
      <LoginButton type="submit" disabled={!isValid}>
        제출
      </LoginButton>
    </form>
  );
}

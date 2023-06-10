import { useInput } from '@/hooks';
import { FormInput, LoginButton } from '@/components';
import { useState, useEffect } from 'react';

export function AuthForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      console.log('제출완료');
    } else {
      console.log('통과ㄴㄴ');
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
        로그인
      </LoginButton>
    </form>
  );
}

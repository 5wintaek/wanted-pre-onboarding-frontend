import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput, LoginButton } from '@/components';
import { PROD_ADDRESS } from '@/api/api';

export function SignUpPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  useEffect(() => {
    if (isRegistered) {
      console.log('가입완료');
      navigate('/signin');
    } else {
      return;
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todo');
    }
  }, [navigate]);

  const url = { PROD_ADDRESS };
  const api = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail || !validPassword) {
      alert('이메일 혹은 비밀번호를 올바르게 입력해주세요');
      return;
    }
    console.log(PROD_ADDRESS);
    try {
      const response = await api.post('/auth/signup', {
        email: email,
        password: password,
      });
      console.log(response);
      setIsRegistered(() => true);
      navigate('/signin');
    } catch (error) {
      console.log(console.error());
    }
  };

  const handleChnageInputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setValidEmail(validateEmail(e.target.value));
  };

  const handleChnageInputPassWord = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setValidPassword(validatePassword(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📌 회원가입 페이지</h2>
      <label htmlFor="eamil">Email : </label>
      <FormInput
        data-testid="email-input"
        name="eamil"
        type="email"
        onChange={handleChnageInputEmail}
      />
      <label htmlFor="password">Password : </label>
      <FormInput
        data-testid="password-input"
        name="password"
        type="password"
        onChange={handleChnageInputPassWord}
      />
      <LoginButton
        data-testid="signup-button"
        type="submit"
        disabled={!validEmail || !validPassword}
      >
        회원가입
      </LoginButton>
    </form>
  );
}

import axios from 'axios';
import { useState, useEffect } from 'react';
import { DEV_ADDRESS } from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { FormInput, LoginButton } from '@/components';

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
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todo');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail || !validPassword) {
      alert('이메일 혹은 비밀번호를 올바르게 입력해주세요');
      return;
    }

    console.log(DEV_ADDRESS);
    try {
      await axios.post(`${DEV_ADDRESS}/auth/signup`, {
        email,
        password,
      });
      setIsRegistered(() => true);
    } catch (error) {
      alert(error.response.data.message);
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
      <h2>🏠 회원가입 페이지</h2>
      <label htmlFor="eamil">Email : </label>
      <FormInput
        data-testid="password-input"
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
      <LoginButton type="submit" disabled={!validEmail || !validPassword}>
        회원가입
      </LoginButton>
    </form>
  );
}

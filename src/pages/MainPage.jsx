import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 16px;
  margin: 10px;
`;

export function MainPage() {
  return (
    <>
      <LinkStyle to="/signin">🔑 SignIn</LinkStyle>
      <LinkStyle to="/signup">📌 SignUp</LinkStyle>
    </>
  );
}

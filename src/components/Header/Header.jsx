import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

export function Header() {
  return (
    <h1>
      <LinkStyle to="/"> Todo List </LinkStyle>
    </h1>
  );
}

import { Link } from 'react-router-dom';

export function MainPage() {
  return (
    <div>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}

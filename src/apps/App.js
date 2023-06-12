import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <h1>원티드 프리온보딩 프론트엔드</h1>
      <Outlet />
    </main>
  );
};

export default App;

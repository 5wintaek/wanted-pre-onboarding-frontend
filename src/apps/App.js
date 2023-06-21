import { Header } from '@/components';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  );
};

export default App;

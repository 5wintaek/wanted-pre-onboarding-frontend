import ReactDOM from 'react-dom/client';
import App from '@/apps/App';
import { SignInPage, SignUpPage, NotFoundPage, Todo } from '@/pages';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';

const token = localStorage.getItem('token');

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signup',
        element: token ? <Navigate to="/todo" /> : <SignUpPage />,
      },
      {
        path: 'signin',
        element: token ? <Navigate to="/todo" /> : <SignInPage />,
      },
      { path: 'todo', element: !token ? <Navigate to="/signin" /> : <Todo /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodoProvider>
    <RouterProvider router={router} />
  </TodoProvider>
);

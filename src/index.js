import ReactDOM from 'react-dom/client';
import App from '@/apps/App';

import { SignInPage, SignUpPage, NotFoundPage, Todo } from '@/pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'signup', element: <SignUpPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'todo', element: <Todo /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
);

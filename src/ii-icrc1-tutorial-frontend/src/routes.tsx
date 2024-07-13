import App from './pages/index';
import MembersPage from './pages/members';
import CreatePostPage from './pages/new';
import MemberDetailPage, { memberLoader } from './pages/members/detail';
import SignUp from './pages/auth/signup';
import ErrorPage from './pages/error-page';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/root';
import ProfilePage, { profileLoader } from './pages/account';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'account',
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: 'new/post',
        element: <CreatePostPage />,
      },
      {
        path: 'members',
        element: <MembersPage />,
      },
      {
        path: 'members/:id',
        element: <MemberDetailPage />,
        loader: memberLoader,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
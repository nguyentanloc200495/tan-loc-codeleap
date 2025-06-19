import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// import AuthGuard from 'guards/AuthGuard';
// guards
// layouts
// components
import LoadingScreen from 'components/LoadingScreen';
// hooks

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// PAGE
const ProjectList = Loadable(lazy(() => import('pages/ProjectList')));
const MainPage = Loadable(lazy(() => import('pages/MainPage')));
const HomePage = Loadable(lazy(() => import('pages/HomePage')));


export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="main" replace />,
    },
    {
      path: 'project-list',
      element: <ProjectList />,
    },
    {
      path: 'main',
      element: <MainPage />,
    },
        {
      path: 'home',
      element: <HomePage />,
    },
    { path: '*', element: <Navigate to="/main" replace /> },
  ]);
}

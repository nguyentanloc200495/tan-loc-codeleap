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
const MainPage = Loadable(lazy(() => import('pages/MainPage')));

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="main" replace />,
    },

    {
      path: 'main',
      element: <MainPage />,
    },
      
    { path: '*', element: <Navigate to="/main" replace /> },
  ]);
}

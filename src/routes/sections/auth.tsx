import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split/layout';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const Auth = {
  SignInPage: lazy(() => import('src/pages/auth/sign-in')),
};

const auth = {
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Auth.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [auth],
  },
];

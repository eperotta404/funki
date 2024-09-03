import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard/auth-guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const PageReportEvents = lazy(() => import('src/pages/dashboard/reportEvents/report-events'));
const PageReportPayments = lazy(() => import('src/pages/dashboard/report-payments'));
const PageReportSellers = lazy(() => import('src/pages/dashboard/report-sellers'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'reports',
        children: [
          { element: <PageReportEvents />, index: true },
          { path: 'payments', element: <PageReportPayments /> },
          { path: 'sellers', element: <PageReportSellers /> },
        ],
      },
    ],
  },
];

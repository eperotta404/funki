import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard/auth-guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const PageReportEvent = lazy(() => import('src/pages/dashboard/reportEvent/report-event'));
const PageReportBundle = lazy(() => import('src/pages/dashboard/reportBundle/report-bundle'));
const PageReportSales = lazy(() => import('src/pages/dashboard/reportSales/report-sales'));

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
        path: 'report',
        children: [
          { element: <PageReportEvent />, index: true },
          { path: 'bundle', element: <PageReportBundle /> },
          { path: 'sales', element: <PageReportSales /> },
        ],
      },
    ],
  },
];

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth:{
    signIn: `${ROOTS.AUTH}/sign-in`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    reports: {
      root: `${ROOTS.DASHBOARD}/reports?l=false`,
      payments: `${ROOTS.DASHBOARD}/reports/payments?l=false`,
      sellers: `${ROOTS.DASHBOARD}/reports/sellers`,
    },
  },
};

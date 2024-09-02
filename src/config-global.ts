

import { paths } from './routes/paths';
import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  baseApiUrl: string;
  serverUrl: string;
  assetsDir: string;
  auth: {
    skip: boolean;
    redirectPath: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Funki - Portal de Aliados',
  appVersion: packageJson.version,
  baseApiUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  auth: {
    skip: false,
    redirectPath: paths.dashboard.root,
  }
};

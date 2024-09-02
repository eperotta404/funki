import 'src/global.css';

// ----------------------------------------------------------------------

import { I18nextProvider } from 'react-i18next';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import i18n from './i18n';
import { AuthProvider } from './auth/context';
import { OrganizationProvider } from './layouts/components/organization-popover/context/organization-selector-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <SettingsProvider settings={defaultSettings}>
        <ThemeProvider>
          <MotionLazy>
            <ProgressBar />
            <I18nextProvider i18n={i18n}>
              <OrganizationProvider>
                <SettingsDrawer />

                <Router />
              </OrganizationProvider>
            </I18nextProvider>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

export default function EventNotAvailable() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: '35vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {t('events.filter.eventNotFound')}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {t('events.filter.eventNotFoundFeedback')}
      </Typography>
    </Box>
  );
}

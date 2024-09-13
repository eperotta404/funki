import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

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
        {capitalizeFirtsLetter(t('events.filter.eventNotFound'))}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {capitalizeFirtsLetter(t('events.filter.eventNotFoundFeedback'))}
      </Typography>
    </Box>
  );
}

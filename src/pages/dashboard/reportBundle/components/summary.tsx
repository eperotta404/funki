import { useTranslation } from 'react-i18next';

import { Box, Card, useTheme, Typography, CardContent } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import CardSummary from './card-summary';
import { AnalyticsTimeline } from './analytics-timeline';

const _analyticOrderTimeline = [
  {
    id: '1',
    title: 'Atlas vs Chivas',
    type: 'type1',
    link: 'https://www.google.com/',
    time: '2024-04-01 16:15',
  },
  {
    id: '2',
    title: 'Atlas vs Santos',
    type: 'type5',
    link: 'https://www.google.com/',
    time: '2024-04-17 17:30',
  },
  {
    id: '3',
    title: 'Atlas vs Pumas y Tigres',
    type: 'type4',
    link: 'https://www.google.com/',
    time: '2025-06-01 21:00',
  },
  {
    id: '4',
    title: 'Atlas vs Boca Jrs',
    type: 'type1',
    link: 'https://www.google.com/',
    time: '2025-01-01 21:00',
  },
  {
    id: '5',
    title: 'Atlas vs Chivas',
    type: 'type1',
    link: 'https://www.google.com/',
    time: '2025-01-06 20:00',
  },
  {
    id: '5',
    title: 'Atlas vs Santos',
    type: 'type1',
    link: 'https://www.google.com/',
    time: '2025-02-03 20:00',
  },
];

export default function Summary() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ display: 'flex', my: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" color={theme.vars.palette.primary.main}>
          Abono Flex Promo 2024
        </Typography>
      </Box>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
        sx={{
          mt: 3,
          '@media (min-width: 1200px) and (max-width: 1399px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        <Card>
          <AnalyticsTimeline
            title={capitalizeFirtsLetter(t('bundles.summary.matches'))}
            list={_analyticOrderTimeline}
          />
        </Card>
        <Card>
          <CardContent>
            <CardSummary team="Atlas Masculino" />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

import { useTranslation } from 'react-i18next';

import { Box, Button, useTheme, Typography } from '@mui/material';

import { fFormatDateTime } from 'src/utils/format-time';
import { capitalizeFirtsLetter } from 'src/utils/helper';

import { Iconify } from 'src/components/iconify';

import Card2SummaryEvent from './card-2-summary';
import Card3SummaryEvent from './card-3-summary';
import CardSummaryEvent from './card-summary-event';

import type { FilterEventOption } from '../report-event';

interface SummaryEventProps {
  selectedEvent: FilterEventOption;
}

export default function SummaryEvent({ selectedEvent }: SummaryEventProps) {
  const theme = useTheme();

  const { t } = useTranslation();

  const { formattedDate, timeWithTimezone } = fFormatDateTime({
    date: selectedEvent?.details?.date || '',
  });

  const handleDownload = () => {
    console.log('download...');
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          my: 1,
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="h3" color={theme.vars.palette.primary.main}>
          {`${selectedEvent?.details?.home} vs ${selectedEvent?.details?.away}`}
        </Typography>
        <Button
          onClick={handleDownload}
          startIcon={<Iconify icon="eva:cloud-download-fill" />}
          variant="outlined"
          size="small"
          color="primary"
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          <strong>{capitalizeFirtsLetter(t('events.buttons.download'))} </strong>
        </Button>
      </Box>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        sx={{
          mt: 3,
          '@media (min-width: 1200px) and (max-width: 1399px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        <Card2SummaryEvent
          icon="game-icons:soccer-ball"
          status={selectedEvent?.details?.status}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.error.lightChannel}
          colorSvg="grey.main"
        />
        <CardSummaryEvent
          icon="guidance:stadium"
          line1={`<strong style="font-size: 2rem; color: ${theme.vars.palette.primary.main}">${selectedEvent?.details?.home}</strong>`}
          line2={`<strong style="font-size: 1.5rem;color: ${theme.vars.palette.primary.mainChannel}">${selectedEvent?.details?.away} </strong>`}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.error.lightChannel}
          colorSvg="grey.main"
        />

        <Card3SummaryEvent
          icon="fluent-mdl2:date-time"
          line1={formattedDate}
          line2={timeWithTimezone}
          line3={selectedEvent?.details?.stadium}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.error.lightChannel}
          colorSvg="grey.main"
        />
      </Box>
    </>
  );
}

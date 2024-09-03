import { useTranslation } from 'react-i18next';

import { Box, Button, useTheme } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import CardSummaryEvent from './card-summary-event';

const SUMMARY = [
  {
    line1: 'Atlas vs Santos',
    line2: 'Atlas Masculino',
    line3: 'Santos',
    icon: 'guidance:stadium',
  },
  {
    line1: 'Liga Mx',
    line2: 'Temporada 2024',
    line3: '5/8',
    icon: 'game-icons:soccer-ball',
  },
  {
    line1: '10/06/2024',
    line2: '19:05 (-6)',
    line3: 'Jalisco',
    icon: 'cil:calendar',
  },
];

const status = 'Jugando';

export default function SummaryEvent() {
  const theme = useTheme();

  const { t } = useTranslation();
  const handleDownload = () => {
    console.log('download...');
  };
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Label variant="soft" color="primary" sx={{ p: 2, mr: 1.5 }}>
          {status}
        </Label>
        <Button
          onClick={handleDownload}
          startIcon={<Iconify icon="eva:cloud-download-fill" />}
          variant="outlined"
          size="small"
          color="primary"
        >
          <strong>{t('events.buttons.download')} </strong>
        </Button>
      </Box>
      <Box
        gap={8}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        sx={{ mt: 5 }}
      >
        <CardSummaryEvent
          icon={SUMMARY[0].icon}
          line1={`<strong>${SUMMARY[0].line1}</strong`}
          line2={`<strong>${t('events.summaryEvent.team')}: </strong>${SUMMARY[0].line2}`}
          line3={`<strong>${t('events.summaryEvent.rival')}: </strong>${SUMMARY[0].line3}`}
          color1={theme.vars.palette.secondary.lightChannel}
          color2={theme.vars.palette.info.lightChannel}
          colorSvg="grey.main"
        />

        <CardSummaryEvent
          icon={SUMMARY[1].icon}
          line1={`<strong>${t('events.summaryEvent.league')}: </strong>${SUMMARY[1].line1}`}
          line2={`<strong>${t('events.summaryEvent.season')}: </strong>${SUMMARY[1].line2}`}
          line3={`<strong>${t('events.summaryEvent.match')}: </strong>${SUMMARY[1].line3}`}
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.primary.lightChannel}
          colorSvg="primary.main"
        />

        <CardSummaryEvent
          icon={SUMMARY[2].icon}
          line1={`<strong>${t('events.summaryEvent.date')}: </strong>${SUMMARY[2].line1}`}
          line2={`<strong>${t('events.summaryEvent.time')}: </strong>${SUMMARY[2].line2}`}
          line3={`<strong>${t('events.summaryEvent.stadium')}: </strong>${SUMMARY[2].line3}`}
          color1={theme.vars.palette.info.lightChannel}
          color2={theme.vars.palette.error.lightChannel}
          colorSvg="error.main"
        />
      </Box>
    </>
  );
}

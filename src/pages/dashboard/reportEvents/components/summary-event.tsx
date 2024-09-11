import { useTranslation } from 'react-i18next';

import { Box, Button, useTheme, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import Card2SummaryEvent from './card-2-summary';
import CardSummaryEvent from './card-summary-event';

const SUMMARY = [
  {
    line1: 'Atlas vs Santos',
    line2: 'Atlas Masculino',
    line3: 'Santos',
    icon: 'guidance:stadium',
  },
  
  {
    line1: '10/06/2024',
    line2: '19:05 (-6)',
    line3: 'Jalisco',
    icon: 'cil:calendar',
  },
];


export default function SummaryEvent() {
  const theme = useTheme();

  const { t } = useTranslation();
  const handleDownload = () => {
    console.log('download...');
  };
  return (
    <>
      <Box sx={{ my: 2 }}>
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
      <Typography variant="h3" color={theme.vars.palette.primary.main}>{SUMMARY[0].line1}</Typography>
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
            gridTemplateColumns: 'repeat(2, 1fr)', // Se agrupa de a 2 en esta resolución intermedia
          },
        }}
      >
        <Card2SummaryEvent
          icon="game-icons:soccer-ball"
          status={t("events.summary.live")}
          statusColor="primary"
          color1={theme.vars.palette.warning.lightChannel}
          color2={theme.vars.palette.error.lightChannel}
          colorSvg="grey.main"
        />
        <CardSummaryEvent
          icon={SUMMARY[0].icon}
          line1={`<strong>${t('events.summary.team')}: </strong>${SUMMARY[0].line2}`}
          line2={`<strong>${t('events.summary.rival')}: </strong>${SUMMARY[0].line3}`}
          color1={theme.vars.palette.secondary.lighterChannel}
          color2={theme.vars.palette.warning.lightChannel}
          colorSvg="grey.main"
        />

        <CardSummaryEvent
          icon={SUMMARY[1].icon}
          line1={`<strong>${t('events.summary.date')}: </strong>${SUMMARY[1].line1}`}
          line2={`<strong>${t('events.summary.time')}: </strong>${SUMMARY[1].line2}`}
          line3={`<strong>${t('events.summary.stadium')}: </strong>${SUMMARY[1].line3}`}
          color1={theme.vars.palette.info.lightChannel}
          color2={theme.vars.palette.success.lightChannel}
          colorSvg="error.main"
        />
      </Box>
    </>
  );
}

import { useTranslation } from 'react-i18next';

import { Box, Tooltip, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';
import { capitalizeFirtsLetter } from 'src/utils/helper';

import { Iconify } from 'src/components/iconify';

interface CardTotalsEventProps {
  team: string;
}

export default function CardSummaryBundle(props: CardTotalsEventProps) {
  const { team } = props;
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" color="primary.main">
        {team}
      </Typography>
      <Box
        sx={{
          mt: 7,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Tooltip title={capitalizeFirtsLetter(t("bundles.summary.startDate"))} arrow>
          <Iconify icon="clarity:calendar-line" width={40} sx={{ color: 'text.primary' }} />
        </Tooltip>
        <Typography variant="subtitle1" color="text.primary" sx={{ fontSize: { xs: 16, sm: 18} }}>
          {fDateTime('2024-04-01 16:15')}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 7,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Tooltip title={capitalizeFirtsLetter(t("bundles.summary.endDate"))} arrow>
          <Iconify icon="clarity:calendar-solid" width={40} sx={{ color: 'text.primary' }} />
        </Tooltip>
        <Typography variant="subtitle1" color="text.primary" sx={{ fontSize: { xs: 16, sm: 18} }}>
          {fDateTime('2025-01-06 20:00')}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Tooltip title={capitalizeFirtsLetter(t("bundles.summary.matches"))} arrow>
          <Iconify icon="game-icons:soccer-ball" width={40} sx={{ color: 'text.primary' }} />
        </Tooltip>
        <Typography
          variant="h2"
          color="text.primary"
          sx={{  fontWeight: 'bold' }}
        >
          5/10
        </Typography>
      </Box>
    </>
  );
}

import { Box, Tooltip, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

interface CardTotalsEventProps {
  team: string;
}

export default function CardSummaryPayments(props: CardTotalsEventProps) {
  const { team } = props;

  return (
    <>
      <Typography variant="h3" color="primary.main">
        {team}
      </Typography>
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Tooltip title="Fecha Inicio" arrow>
          <Iconify icon="clarity:calendar-line" width={40} sx={{ color: 'text.primary' }} />
        </Tooltip>
        <Typography variant="subtitle1" color="text.primary">
          {fDateTime('2024-04-01 16:15')}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Tooltip title="Fecha Fin" arrow>
          <Iconify icon="clarity:calendar-solid" width={40} sx={{ color: 'text.primary' }} />
        </Tooltip>
        <Typography variant="subtitle1" color="text.primary">
          {fDateTime('2025-01-06 20:00')}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Tooltip title="Partidos" arrow>
          <Iconify icon="game-icons:soccer-ball" width={40} sx={{ color: 'text.primary' }} />
        </Tooltip>
        <Typography variant="subtitle1" color="text.primary">
          5/10
        </Typography>
      </Box>
    </>
  );
}

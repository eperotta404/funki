import { useTranslation } from 'react-i18next';

import { Box, Paper, TextField, Autocomplete } from '@mui/material';

const teams = [
  { id: 1, label: 'Equipo 1' },
  { id: 2, label: 'Equipo 2' },
];

const leagues = [
  { id: 1, label: 'Liga 1' },
  { id: 2, label: 'Liga 2' },
];

export default function FiltersEvent() {
  const { t } = useTranslation();
  return (
    <Box
      gap={5}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      sx={{ mt: 5 }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-team"
        options={teams}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              background: 'white !important',
            }}
          />
        )}
        renderInput={(params) => <TextField {...params} label={t('events.detailEvent.team')} fullWidth />}
        sx={{ background: 'white' }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-league"
        options={leagues}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              background: 'white !important',
            }}
          />
        )}
        renderInput={(params) => (
          <TextField {...params} label={t('events.detailEvent.league')} fullWidth />
        )}
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}

import { useTranslation } from 'react-i18next';

import { Box, Paper, TextField, Autocomplete } from '@mui/material';

interface FiltersEventProps {
  teams: { id: string; label: string }[];
  dates: { id: string; label: string }[];
  events: { id: string; label: string }[];
  selectedTeam: { id: string; label: string } | null
}

export default function FiltersEvent({ teams, dates, events, selectedTeam }: FiltersEventProps) {
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
        value={selectedTeam}
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
          <TextField {...params} label={t('events.filter.teams')} fullWidth />
        )}
        sx={{ background: 'white' }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-date"
        options={dates}
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
          <TextField {...params} label={t('events.filter.dates')} fullWidth />
        )}
        sx={{ backgroundColor: 'white' }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-date"
        options={events}
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
          <TextField {...params} label={t('events.filter.events')} fullWidth />
        )}
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}

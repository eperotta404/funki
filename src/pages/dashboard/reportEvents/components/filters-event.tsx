import { useTranslation } from 'react-i18next';

import { Box, Paper, TextField, Autocomplete } from '@mui/material';

import type { FilterOption, FilterEventOption } from '../report-events';

interface FiltersEventProps {
  teams: FilterOption[];
  years: FilterOption[];
  events: FilterOption[];
  selectedTeam: FilterOption | null;
  selectedYear: FilterOption | null;
  selectedEvent: FilterOption | null;
  onTeamChange: (team: FilterOption | null) => void;
  onYearChange: (date: FilterOption | null) => void;
  onEventChange: (event: FilterEventOption | null) => void;
}

export default function FiltersEvent({ teams, years, events, selectedTeam, selectedYear, selectedEvent, onTeamChange, onYearChange, onEventChange }: FiltersEventProps) {
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
        onChange={(event, newValue) => onTeamChange(newValue)}
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
        options={years}
        value={selectedYear}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(event, newValue) => onYearChange(newValue)}
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
          <TextField {...params} label={t('events.filter.year')} fullWidth />
        )}
        sx={{ backgroundColor: 'white' }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-date"
        options={events}
        value={selectedEvent}
        onChange={(event, newValue: any) => onEventChange(newValue)}
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

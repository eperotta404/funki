import { useTranslation } from 'react-i18next';

import { Box, Paper, useTheme, TextField, Autocomplete } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import type { FilterOption, FilterEventOption } from '../../reportEvent/report-event';


interface FiltersProps {
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

export default function Filters({
  teams,
  years,
  events,
  selectedTeam,
  selectedYear,
  selectedEvent,
  onTeamChange,
  onYearChange,
  onEventChange,
}: FiltersProps) {
  const { t } = useTranslation();
  const theme = useTheme();
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
          <TextField
            {...params}
            label={capitalizeFirtsLetter(t('events.filter.teams'))}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.vars.palette.secondary.lighter,
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: theme.vars.palette.secondary.light,
                },
              },
            }}
          />
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
          <TextField
            {...params}
            label={capitalizeFirtsLetter(t('events.filter.year'))}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.vars.palette.secondary.lighter,
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: theme.vars.palette.secondary.light,
                },
              },
            }}
          />
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
          <TextField
            {...params}
            label={capitalizeFirtsLetter(t('events.filter.bundles'))}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.vars.palette.secondary.lighter,
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: theme.vars.palette.secondary.light,
                },
              },
            }}
          />
        )}
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}

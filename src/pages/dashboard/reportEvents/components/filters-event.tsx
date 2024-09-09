import { useTranslation } from 'react-i18next';

import { Box, Paper, TextField, Autocomplete } from '@mui/material';

import { useOrganization } from 'src/layouts/components/organization-popover/context/organization-selector-context';

const dates = [
  { id: 1, label: '24/9/2024' },
  { id: 2, label: '24/9/2024' },
];

const events = [
  { id: 1, label: 'Evento 1' },
  { id: 2, label: 'Evento 2' },
];

export default function FiltersEvent() {
  const { selectedOrganization } = useOrganization();

  const { t } = useTranslation();

  const teams = selectedOrganization ? selectedOrganization.squads.map(squad => ({
    id: squad.id,
    label: squad.name,
  })) : [];


  const selectedTeam = teams.length > 0 ? teams[0] : null;

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

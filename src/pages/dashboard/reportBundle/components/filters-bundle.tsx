import { useTranslation } from 'react-i18next';

import { Box, Paper, TextField, Autocomplete } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
const selectedYear = '2024';

const teams = ['team1', 'team2', 'team3'];
const selectedTeam = 'team1';

const bundles = ['bundle1', 'bundle2', 'bundle3'];
const selectedBundle = 'bundle1';

export default function FiltersBundle() {
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
        id="combo-box-date"
        options={years}
        value={selectedYear}
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
          <TextField {...params} label={capitalizeFirtsLetter(t('bundles.filter.year'))} fullWidth />
        )}
        sx={{ background: 'white' }}
      />

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
          <TextField {...params} label={capitalizeFirtsLetter(t('bundles.filter.teams'))} fullWidth />
        )}
        sx={{ backgroundColor: 'white' }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-bundle"
        options={bundles}
        value={selectedBundle}
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
          <TextField {...params} label={capitalizeFirtsLetter(t('bundles.filter.bundles'))} fullWidth />
        )}
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}
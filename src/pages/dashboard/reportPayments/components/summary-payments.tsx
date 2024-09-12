import { Box, Card, useTheme, Typography, CardContent } from '@mui/material';

import { AnalyticsTimeline } from './analytics-timeline';


const _analyticOrderTimeline = [
    { id: "1", title: "1983, orders, $4220", type: "order1", time: "2022-01-01" },
    { id: "2", title: "1983, orders, $4220", type: "order1", time: "2022-01-01" },
    { id: "3", title: "1983, orders, $4220", type: "order1", time: "2022-01-01" }
  ];

export default function SummaryPayments() {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: 'flex', my: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" color={theme.vars.palette.primary.main}>
          Abono 1
        </Typography>
      </Box>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
        sx={{
          mt: 3,
          '@media (min-width: 1200px) and (max-width: 1399px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        <Card>
          <AnalyticsTimeline title="Order timeline" list={_analyticOrderTimeline} />
        </Card>
        <Card>
          <CardContent> 2</CardContent>
        </Card>
      </Box>
    </>
  );
}

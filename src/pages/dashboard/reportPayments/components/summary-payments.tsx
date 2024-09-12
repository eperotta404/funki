import { Box, Card, useTheme, Typography, CardContent } from '@mui/material';



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
          <CardContent> 1</CardContent>
        </Card>
        <Card>
          <CardContent> 2</CardContent>
        </Card>
      </Box>
    </>
  );
}

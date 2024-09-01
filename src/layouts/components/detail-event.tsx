import { Box, Button, Card, Typography } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

const DETAIL = [
  {
    line1: 'Atlas vs Santos',
    line2: 'Atlas Masculino',
    line3: 'Santos',
    icon: 'guidance:stadium',
  },
  {
    line1: 'Liga Mx',
    line2: 'Temporada 2024',
    line3: '5/8',
    icon: 'game-icons:soccer-ball',
  },
  {
    line1: '10/06/2024',
    line2: '19:05 (-6)',
    line3: 'Jalisco',
    icon: 'cil:calendar',
  },
];

const status = 'Jugando';

export default function DetailEvent() {
  const handleDownload = () => {
    console.log('download...');
  };
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Label variant="soft" color="success" sx={{ p: 2, mr: 1.5 }}>
          {status}
        </Label>
        <Button
          onClick={handleDownload}
          startIcon={<Iconify icon="eva:cloud-download-fill" />}
          variant="outlined"
          size="small"
          color="primary"
        >
          Download
        </Button>
      </Box>
      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        sx={{ my: 2 }}
      >
        <Card sx={{ textAlign: 'center', px: 5, py: 2 }}>
          <Iconify icon={DETAIL[0].icon} width={32} sx={{ color: 'primary.main' }} />
          <Typography variant="body2" sx={{ mb: 1, mt: 2 }}>
            <strong>{DETAIL[0].line1}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Equipo: </strong>
            {DETAIL[0].line2}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Rival: </strong>
            {DETAIL[0].line3}
          </Typography>
        </Card>

        <Card sx={{ textAlign: 'center', px: 5, py: 2 }}>
          <Iconify icon={DETAIL[1].icon} width={32} sx={{ color: 'primary.main' }} />
          <Typography variant="body2" sx={{ mb: 1, mt: 2 }}>
            <strong>Liga: </strong>
            {DETAIL[1].line1}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Temporada: </strong>
            {DETAIL[1].line2}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Partido: </strong>
            {DETAIL[1].line3}
          </Typography>
        </Card>

        <Card sx={{ textAlign: 'center', px: 5, py: 2 }}>
          <Iconify icon={DETAIL[2].icon} width={32} sx={{ color: 'primary.main' }} />
          <Typography variant="body2" sx={{ mb: 1, mt: 2 }}>
            <strong>Fecha: </strong>
            {DETAIL[2].line1}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Hora: </strong>
            {DETAIL[2].line2}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Estadio: </strong>
            {DETAIL[2].line3}
          </Typography>
        </Card>
      </Box>
    </>
  );
}

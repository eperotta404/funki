import type { LabelColor } from 'src/components/label';

import { useTranslation } from 'react-i18next';

import { Box, Card, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

interface Card2SummaryEventProps {
  icon: string;
  status: string;
  statusColor: LabelColor;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function Card2SummaryEvent(props: Card2SummaryEventProps) {
  const { icon, status, statusColor, color1, color2, colorSvg } = props;
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        pt: 2,
        pb: 3,
        position: 'relative',
        textAlign: 'left',
        ...bgGradient({
          color: `135deg, ${varAlpha(color1, 0.48)}, ${varAlpha(color2, 0.48)}`,
        }),
      }}
    >
      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 260,
          height: 240,
          zIndex: -1,
          opacity: 0.25,
          color: colorSvg,
        }}
      />
      <Iconify icon={icon} width={40} sx={{ color: 'primary.main', ml: 2 }} />
      <Box sx={{ textAlign: 'center', mt: -2 }}>
        <Typography variant="h3" sx={{ color: 'text.info',fontWeight: 900 }}>
        {status.toUpperCase()}
        </Typography>

      </Box>
    </Card>
  );
}

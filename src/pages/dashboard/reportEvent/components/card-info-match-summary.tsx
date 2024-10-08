import { useTranslation } from 'react-i18next';

import { Box, Card, Tooltip, Typography } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

interface CardInfoMatchSummaryProps {
  icon: string;
  line1: string;
  line2: string;
  line3: string;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function CardInfoMatchSummary(props: CardInfoMatchSummaryProps) {
  const { icon, line1, line2, line3, color1, color2, colorSvg } = props;
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
      <Iconify icon={icon} width={40} sx={{ color: 'primary.light', ml: 2 }} />

      <Box sx={{ textAlign: 'start', ml: 10, mt: line3 ? -2 : 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Tooltip title={capitalizeFirtsLetter(t('events.summary.date'))} arrow>
            <Iconify
              icon="ic:outline-date-range"
              width={25}
              sx={{ color: 'primary.main', mr: 1 }}
            />
          </Tooltip>

          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 900 }}>
            {line1}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
          <Tooltip title={capitalizeFirtsLetter(t('events.summary.time'))} arrow>
            <Iconify icon="bx:time" width={25} sx={{ color: 'primary.main', mr: 1 }} />
          </Tooltip>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 900 }}>
            {line2}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Tooltip title={capitalizeFirtsLetter(t('events.summary.stadium'))} arrow>
            <Iconify icon="mdi:stadium-outline" width={25} sx={{ color: 'primary.main', mr: 1 }} />
          </Tooltip>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 900 }}>
            {line3}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

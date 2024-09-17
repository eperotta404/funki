import { useTranslation } from 'react-i18next';

import { Box, Card, Tooltip, Typography } from '@mui/material';

import { capitalizeFirtsLetter } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

interface CardDetailEventProps {
  icon: string;
  line1: string;
  line2: string;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function CardSummaryEvent(props: CardDetailEventProps) {
  const { icon, line1, line2, color1, color2, colorSvg } = props;
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        pt: 2,
        pb: 3,
        position: 'relative',

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
      <Box sx={{ textAlign: 'start', ml: 6, mt: 0 }}>
        <Typography
          variant="body1"
          sx={{ color: 'text.info' }}
          dangerouslySetInnerHTML={{ __html: line1 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1}}>
          <Tooltip title={capitalizeFirtsLetter(t('events.summary.rival'))} arrow>
            <Iconify icon="tabler:vs" width={25} sx={{ color: 'primary.main', mr: 1 }} />
          </Tooltip>
          <Typography
            variant="body1"
            sx={{ color: 'text.info' }}
            dangerouslySetInnerHTML={{ __html: line2 }}
          />
        </Box>
      </Box>
    </Card>
  );
}

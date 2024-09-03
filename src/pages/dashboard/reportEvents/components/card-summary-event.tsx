import { Box, Card, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

interface CardDetailEventProps {
  icon: string;
  line1: string;
  line2: string;
  line3: string;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function CardSummaryEvent(props: CardDetailEventProps) {
  const { icon, line1, line2, line3, color1, color2, colorSvg } = props;
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
        <Typography
          variant="body1"
          sx={{ color: 'text.info' }}
          dangerouslySetInnerHTML={{ __html: line1 }}
        />
        <Typography
          variant="body1"
          sx={{ color: 'text.info' }}
          dangerouslySetInnerHTML={{ __html: line2 }}
        />
        <Typography
          variant="body1"
          sx={{ color: 'text.info' }}
          dangerouslySetInnerHTML={{ __html: line3 }}
        />
      </Box>
    </Card>
  );
}

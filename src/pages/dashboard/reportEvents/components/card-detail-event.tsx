import type { ColorType } from 'src/theme/core';

import { Card, Typography } from '@mui/material';

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
}

export default function CardDetailEvent(props: CardDetailEventProps) {
  const { icon, line1, line2, line3, color1, color2 } = props;
  return (
    <Card
      sx={{
        textAlign: 'center',
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
          opacity: 0.24,
          color: 'secondary.main',
        }}
      />
      <Iconify icon={icon} width={32} sx={{ color: 'primary.main' }} />
      <Typography
        variant="body2"
        sx={{ mt: 2, color: 'text.info' }}
        dangerouslySetInnerHTML={{ __html: line1 }}
      />
      <Typography
        variant="body2"
        sx={{ color: 'text.info' }}
        dangerouslySetInnerHTML={{ __html: line2 }}
      />
      <Typography
        variant="body2"
        sx={{ color: 'text.info' }}
        dangerouslySetInnerHTML={{ __html: line3 }}
      />
    </Card>
  );
}

import { Box, Card, Grid, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

interface Card2TotalsEventProps {
  title: string;
  line1: string;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function Card2TotalsEvent(props: Card2TotalsEventProps) {
  const { title, line1, color1, color2, colorSvg } = props;
  return (
    <Card
      sx={{
        pt: 2,
        pb: 2,
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
          opacity: 0.2,
          color: colorSvg,
        }}
      />
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs={12}>
          <Box sx={{ ml: 2, width: 300 }}>
            <Typography
              variant="h4"
              sx={{ color: 'text.info', mb: 1 }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <Typography
              variant="h2"
              sx={{ color: 'text.info' }}
              dangerouslySetInnerHTML={{ __html: line1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

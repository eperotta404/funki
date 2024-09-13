import { Box, Card, Grid, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

interface CardTotalsPaymentsProps {
  title: string;
  line3?: string;
  line4: string;
  line5?: string;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function CardTotalsPayments(props: CardTotalsPaymentsProps) {
  const { title, line3, line4, line5, color1, color2, colorSvg } = props;

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
        <Grid item xs={line5 ? 6 : 12}>
          <Box sx={{ ml: 2, width: 300 }}>
            <Typography
              variant="h4"
              sx={{ color: 'text.info', mb: 1 }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <Typography variant="h6" sx={{ color: 'text.main', fontWeight: 700 }}>
              Abono Flex promo
            </Typography>
            <Typography variant="h4" sx={{ color: 'text.main', fontWeight: 700 }}>
              1,500
            </Typography>


            {!line3 && <Box sx={{ height: 24 }} />} {/* Spacer for when line3 is not present */}

            {line3 && (
              <Typography
                variant="body2"
                sx={{ color: 'text.info' }}
                dangerouslySetInnerHTML={{ __html: line3 }}
              />
            )}

            <Typography
              variant="body1"
              sx={{ color: 'text.info', mt: 1.5, fontSize: 20 }}
              dangerouslySetInnerHTML={{ __html: line4 }}
            />
          </Box>
        </Grid>

        {line5 && (
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: -8,
              }}
            >
              <Typography
                variant="inherit"
                sx={{ color: 'text.primary', textAlign: 'center', fontSize: 35, fontWeight: 700 }}
                dangerouslySetInnerHTML={{ __html: line5 }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

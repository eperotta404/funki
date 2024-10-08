import { useState } from 'react';

import { Box, Card, Grid, Tooltip, Skeleton, IconButton, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

interface CardTotalsProps {
  title: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5?: string;
  loading: boolean;
  color1: string;
  color2: string;
  colorSvg: string;
}

export default function CardTotals(props: CardTotalsProps) {
  const { title, line1, line2, line3, line4, line5, loading, color1, color2, colorSvg } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Card
      sx={{
        pt: 2,
        pb: 2,
        position: 'relative',
        textAlign: 'left',
        ...bgGradient({
          color: `135deg, ${varAlpha(color1, 0.38)}, ${varAlpha(color2, 0.48)}`,
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: 'text.primary' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <Tooltip
          title="Texto de ayuda que aparece al hacer clic"
          open={tooltipOpen}
          onClose={handleTooltipClose}
          onClick={handleTooltipOpen}
          placement="top-start"
          arrow
        >
          <IconButton>
            <Iconify icon="material-symbols:help" width={24} sx={{ color: 'text.primary' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs={line5 ? 6 : 12}>
          <Box sx={{ ml: 2, width: 300 }}>
            {loading ? (
              <Skeleton variant="rectangular" height={20} sx={{ mt: 2, mr: 2 }} />
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 3.5, color: 'text.secondary' }}
                dangerouslySetInnerHTML={{ __html: line1 }}
              />
            )}
            {loading ? (
              <Skeleton variant="rectangular" height={20} sx={{ mt: 1, mr: 2 }} />
            ) : (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
                dangerouslySetInnerHTML={{ __html: line2 }}
              />
            )}

            {loading ? (
              <Skeleton variant="rectangular" height={10} sx={{ mt: 1, mr: 2 }} />
            ) : (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
                dangerouslySetInnerHTML={{ __html: line3 }}
              />
            )}

            {loading ? (
              <Skeleton variant="rectangular" height={30} sx={{ mt: 1, mr: 2 }} />
            ) : (
              <Typography
                variant="body1"
                sx={{ color: 'text.primary', mt: 1.5, fontSize: 20 }}
                dangerouslySetInnerHTML={{ __html: line4 }}
              />
            )}
          </Box>
        </Grid>

        {line5 && (
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: -9,
                mr:2
              }}
            >
              {loading ? (
                <Skeleton variant="rectangular" width={100} height={30} />
              ) : (
                <Typography
                  variant="inherit"
                  sx={{
                    color: 'text.primary',
                    textAlign: 'center',
                    fontSize: 35,
                    fontWeight: 700,
                  }}
                  dangerouslySetInnerHTML={{ __html: line5 }}
                />
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

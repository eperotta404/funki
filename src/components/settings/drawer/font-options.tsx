import Box from '@mui/material/Box';

import { CONFIG } from 'src/config-global';
import { setFont } from 'src/theme/styles';

import { SvgColor } from '../../svg-color';
import { Block, BlockOption } from './styles';

// ----------------------------------------------------------------------

type Props = {
  value: string;
  options: string[];
  onClickOption: (newValue: string) => void;
};

export function FontOptions({ value, options, onClickOption }: Props) {
  return (
    <Block title="Font">
      <Box component="ul" gap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)">
        {options.map((option) => {
          const selected = value === option;

          return (
            <Box component="li" key={option} sx={{ display: 'inline-flex' }}>
              <BlockOption
                selected={selected}
                onClick={() => onClickOption(option)}
                icon={
                  <SvgColor
                    width={28}
                    src={`${CONFIG.assetsDir}/assets/icons/settings/ic-font.svg`}
                    sx={{ color: 'currentColor' }}
                  />
                }
                label={option.endsWith('Variable') ? option.replace(' Variable', '') : option}
                sx={{
                  py: 2,
                  gap: 0.75,
                  flexDirection: 'column',
                  fontFamily: setFont(option),
                  fontSize: (theme) => theme.typography.pxToRem(12),
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Block>
  );
}

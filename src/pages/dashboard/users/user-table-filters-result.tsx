import type { Theme, SxProps } from '@mui/material/styles';
import type { UseSetStateReturn } from 'src/hooks/use-set-state';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export type IUserTableFilters = {
  email: string;
  role: string[];
};

type Props = {
  totalResults: number;
  sx?: SxProps<Theme>;
  onResetPage: () => void;
  filters: UseSetStateReturn<IUserTableFilters>;
};

export function UserTableFiltersResult({ filters, onResetPage, totalResults, sx }: Props) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ email: '' });
  }, [filters, onResetPage]);


  const handleRemoveRole = useCallback(
    (inputValue: string) => {
      const newValue = filters.state.role.filter((item) => item !== inputValue);

      onResetPage();
      filters.setState({ role: newValue });
    },
    [filters, onResetPage]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>

      <FiltersBlock label="Role:" isShow={!!filters.state.role.length}>
        {filters.state.role.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveRole(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.email}>
        <Chip {...chipProps} label={filters.state.email} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}

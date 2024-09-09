import type { ReactNode } from 'react';
import type { Organization } from 'src/core/domain/models/organization';

import React, { useMemo, useState } from 'react';

import { OrganizationContext } from './organization-selector-context';

type OrganizationProviderProps = {
  children: ReactNode;
};

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

  const value = useMemo(
    () => ({
      selectedOrganization,
      setSelectedOrganization,
    }),
    [selectedOrganization]
  );

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
};

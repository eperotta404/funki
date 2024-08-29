import { useContext, createContext } from 'react';

export interface Organization {
  id: string;
  name: string;
  logo: string;
}

interface OrganizationContextValue {
  selectedOrganization: Organization | null;
  setSelectedOrganization: (organization: Organization) => void;
}

export const OrganizationContext = createContext<OrganizationContextValue | undefined>(undefined);

export const useOrganization = (): OrganizationContextValue => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

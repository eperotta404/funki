import type { Event } from 'src/core/domain/models/event';
import type { Organization } from 'src/core/domain/models/organization';
import type { GetEventsByOrganization } from 'src/core/domain/useCases/GetEventsByOrganization';
import type { FilterOption, FilterEventOption } from 'src/pages/dashboard/reportEvent/report-event';

import { useState, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { signOut } from 'src/auth/context';
import { useAuthContext } from 'src/auth/hooks';


export const useFilterData = (getEventsByOrgnizationUseCase: GetEventsByOrganization, selectedOrganization: Organization | null, isBundles: boolean ) => {
  const currentYear = new Date().getFullYear();
  const { checkUserSession } = useAuthContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState<FilterOption[]>([]);
  const [years, setYear] = useState<FilterOption[]>([]);
  const [events, setEvents] = useState<FilterEventOption[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<FilterOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<FilterOption | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FilterEventOption | null>(null);

  const getDatesOrganizationDropdown = (): FilterOption[] => [
    { id: (currentYear - 2).toString(), label: (currentYear - 2).toString() },
    { id: (currentYear - 1).toString(), label: (currentYear - 1).toString() },
    { id: currentYear.toString(), label: currentYear.toString() },
  ];

  const getTeamsFromOrganizationDropdown = (organization: Organization | null): FilterOption[] =>
    organization
      ? organization.squads.map((squad) => ({
          id: squad.shortName,
          label: squad.name,
        }))
      : [];

  const getEventsFromOrganization = (eventsData: Event[] | null): FilterEventOption[] =>
    eventsData
      ? eventsData.map((event) => ({
          id: event.id,
          label: event.name,
          details: event.details,
        }))
      : [];

  const updateFilters = (teamsData: FilterOption[], datesData: FilterOption[]): void => {
    if (teamsData.length === 0) {
      setEvents([]);
      setSelectedEvent(null);
    }
    setTeams(teamsData);
    setYear(datesData);
    setSelectedTeam(teamsData.length > 0 ? teamsData[0] : null);
    setSelectedYear({ id: currentYear.toString(), label: currentYear.toString() });
  };

  useEffect(() => {
    if (selectedOrganization) {
      const teamsData = getTeamsFromOrganizationDropdown(selectedOrganization);
      const datesData = getDatesOrganizationDropdown();
      updateFilters(teamsData, datesData);
    }
  }, [selectedOrganization]);

  useEffect(() => {
    const fetchEventByOrganization = async () => {
      setLoading(true);
      try {
        if (selectedTeam?.id && selectedYear?.id) {
          const res = await getEventsByOrgnizationUseCase.execute(selectedTeam.id, selectedYear.id, isBundles);
          const eventsData = getEventsFromOrganization(res);
          setEvents(eventsData);
          setSelectedEvent(eventsData.length > 0 ? eventsData[0] : null);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTeam && selectedYear) {
      fetchEventByOrganization();
    }
  }, [selectedTeam, selectedYear]);

  const handleError = async (error: any) => {
    if (error.message === 'Forbidden Error') {
      await signOut();
      await checkUserSession?.();
      router.refresh();
    } else {
      console.log(error.message);
    }
  };

  return {
    loading,
    teams,
    years,
    events,
    selectedTeam,
    selectedYear,
    selectedEvent,
    setSelectedTeam,
    setSelectedYear,
    setSelectedEvent,
  };
};

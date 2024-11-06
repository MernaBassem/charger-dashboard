import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Session, sessionStatusUiMapping } from "../../types/session";
import FilterTags from "../elements/filter-tags";
import MultiSelect from "../elements/multiselect";

type SessionsFiltersProps = {
  setFilteredSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  sessionData: Session[];
};

export default function SessionsFilters({
  setFilteredSessions,
  sessionData,
}: SessionsFiltersProps) {
  const [owner, setOwner] = useState<string[]>([]);
  const Status = ["Canceled", "Charging", "Completed"];
  const [filters, setFilters] = useState<Record<string, string[]>>({
    charger: [],
    owner: [],
    status: [],
    from: [""],
    to: [""],
  });

  useEffect(() => {
    getOwnerData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  const getOwnerData = () => {
    const ownerData: string[] = sessionData?.map((session: Session) => session.chargePoint.owner);
    const uniqueOwners = Array.from(new Set(ownerData));
    setOwner(uniqueOwners);
  };

  const handleChangeFilter = (name: string, value: string[]) => {
    const updatedFilter = { ...filters, [name]: value };

    setFilters(updatedFilter);
    const filterFrom = updatedFilter.from[0];
    const filterTo = updatedFilter.to[0];
    const filteredSessions = sessionData?.filter((s) => {
      const sessionStartDate = s.startTime?.split('T')[0];
      const sessionEndDate = s.endTime?.split('T')[0];

      return (
        (updatedFilter.owner.length > 0 ? updatedFilter.owner.includes(s.chargePoint.owner) : true) &&
        (updatedFilter.status.length > 0 ? updatedFilter.status.includes(s.status) : true) &&
        (filterFrom === "" || filterFrom === sessionStartDate) &&
        (filterTo === "" || filterTo === sessionEndDate)
      );
    });

    setFilteredSessions(filteredSessions);
  };

  return (
    <Box p="space-md">
      <Box display="flex" flexWrap="wrap" alignItems="center" gap="space-sm" mb="space-md">
        <Text fontWeight="medium">Filter By</Text>
        <MultiSelect
          name="owner"
          options={owner}
          value={filters.owner}
          handleChangeFilter={handleChangeFilter}
        />
        <MultiSelect
          name="status"
          options={Status}
          value={filters.status}
          handleChangeFilter={handleChangeFilter}
        />
        <FormControl display="flex" alignItems="center" maxW="56">
          <FormLabel>From</FormLabel>
          <Input
            type="date"
            value={filters.from[0] || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter("from", [e.target.value])}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center" maxW="56">
          <FormLabel>To</FormLabel>
          <Input
            type="date"
            value={filters.to[0] || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter("to", [e.target.value])}
          />
        </FormControl>
      </Box>
      <FilterTags filters={filters} />
    </Box>
  );
}


import { Box, Text } from "@chakra-ui/react";
import React, {  useState } from "react";
import {
  cities,
  connectorTypes,
  powerTypes,
} from "../../data/chargers";
import FilterTags from "../elements/filter-tags";
import MultiSelect from "../elements/multiselect";
import { ChargerModel } from "../../types/charger";

type ChargersFiltersProps = {
  setFilteredChargers: React.Dispatch<React.SetStateAction<ChargerModel[]>>;
  chargersstate:ChargerModel[]
};

export default function ChargersFilters({ setFilteredChargers,chargersstate }: ChargersFiltersProps) {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    city: [],
    status: [],
    connector: [],
    type: [],
  });

  const handleChangeFilter = (name: string, value: string[]) => {
   
    const updatedFilter = { ...filters, [name]: value };
    setFilters(updatedFilter);
    const filteredChargers = chargersstate.filter((c) => {
      return (
        (updatedFilter.city.length > 0 ? updatedFilter.city.includes(c.city) : true) &&
        // (updatedFilter.status.length > 0 ? updatedFilter.status.includes(c.status) : true) &&
        (updatedFilter.connector.length > 0
          ? c.connectors.some((c) => updatedFilter.connector.includes(c.name))
          : true) &&
        (updatedFilter.type.length > 0
          ? c.connectors.some((c) => updatedFilter.type.includes(c.type))
          : true)
      );
    });
    setFilteredChargers(filteredChargers);
  };

  return (
    <Box p="space-md">
      <Box display="flex" flexWrap="wrap" alignItems="center" gap="space-sm" mb="space-md">
        <Text fontWeight="medium">Filter By</Text>
        <MultiSelect name="city" options={cities} 
        value={filters.city}
         handleChangeFilter={handleChangeFilter} />
        {/* <MultiSelect
          name="status"
          options={chargerStatuses}
          optionsLabelMapping={chargerStatusUiMapping}
          value={filters.status}
          handleChangeFilter={handleChangeFilter}
        /> */}
        <MultiSelect
          name="connector"
          options={connectorTypes}
          value={filters.connector}
          handleChangeFilter={handleChangeFilter}
        />
        <MultiSelect
          name="type"
          options={powerTypes}
          // value={filters.power type}
          value={filters.type}
          handleChangeFilter={handleChangeFilter}
        />
       
      </Box>
      <FilterTags filters={filters} />
    </Box>
  );
}


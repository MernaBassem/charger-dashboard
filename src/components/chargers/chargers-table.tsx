import {
  Box,
  Button,
  Center,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { paths } from "../../paths";
import { ChargerModel } from "../../types/charger";
// import { ChargerModel } from "../../Redux/Slices/Chargers";

type ChargersTableProps = {
  filteredChargers: ChargerModel[];
  currentPageStartIndex: number;
  currentPageEndIndex: number;
  isLoading: boolean;
};

export default function ChargersTable({
  filteredChargers,
  currentPageStartIndex,
  currentPageEndIndex,
  isLoading,
}: ChargersTableProps) {
  const formatConnectors = (connectors: Record<string, string | number>[]) => {
    const connectorsStrArr = connectors.map((c) => `${c.name} | ${c.type}`);
    const connectorsCount: Record<string, number> = {};

    connectorsStrArr.forEach((c) =>
      connectorsCount[c] ? connectorsCount[c]++ : (connectorsCount[c] = 1)
    );

    return (
      <VStack alignItems="flex-start">
        {Object.entries(connectorsCount).map(([text, count], i) => (
          <Box key={i} fontSize="sm" fontWeight="medium">
            {text} (x{count})
          </Box>
        ))}
      </VStack>
    );
  };

  return (
    <TableContainer>
      <Table>
        <Thead bgColor="neutral.100">
          <Tr>
            {/* <Th> </Th> */}
            <Th>ID</Th>
            <Th>Owner</Th>
            <Th>City</Th>
            <Th>Capacity</Th>
            <Th>Connectors</Th>
            <Th>
              <Box>Sessions</Box>
              {/* <Box mt="space-xs" fontSize="xs">
                (Dec 2023)
              </Box> */}
            </Th>
            <Th>
              <Box>Revenue (EGP)</Box>
              {/* <Box mt="space-xs" fontSize="xs">
                (Dec 2023)
              </Box> */}
            </Th>
            <Th>...</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={9}>
                <Center w="100%" h="10rem">
                  <Spinner size="lg" />
                </Center>
              </Td>
            </Tr>
          ) : filteredChargers?.length > 0 ? (
            filteredChargers
              ?.slice(currentPageStartIndex, currentPageEndIndex)
              .map((charger) => (
                <Tr key={charger.id}>
                  {/* <Td>{i+1}</Td/> */}
                  <Td>{charger.id}</Td>
                  <Td>{charger.owner}</Td>
                  <Td>{charger.city}</Td>
                  <Td>{charger.capacity}</Td>
                  <Td>{formatConnectors(charger.connectors)}</Td>
                  <Td>{charger.totalSessions.toLocaleString()}</Td>
                  <Td>{charger.revenue.thisMonthRevenue.toLocaleString()} </Td>
                  <Td>
                    <HStack>
                      <Button
                        as={Link}
                        href={{
                          pathname: paths.chargers.ocpp,
                          query: {
                            charger_id: charger._id,
                            chargerId: charger.id,
                          },
                        }}
                        colorScheme="blue"
                        size="sm"
                      >
                        OCPP
                      </Button>
                      <Button
                        as={Link}
                        href={{
                          pathname: paths.chargers.edit,
                          query: {
                            chargerId: charger._id,
                            chargerIdId: charger.id,
                          },
                        }}
                        colorScheme="green"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))
          ) : (
            <Center w="65rem" h="10rem">
              <h3>No Data Found</h3>
            </Center>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

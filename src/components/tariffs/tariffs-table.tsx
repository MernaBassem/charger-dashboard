import { Card, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function TariffsTable() {
  return (
    <Card>
      <TableContainer>
        <Table>
          <Thead>
            <Tr bgColor="neutral.100">
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>kWh Tariff</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>AC Type</Td>
              <Td>1.89 EGP</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>DC Type</Td>
              <Td>3.75 EGP</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}

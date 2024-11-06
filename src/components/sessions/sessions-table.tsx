import {
  Badge,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Session } from "../../types/session";
import { TbTrash } from "react-icons/tb";
import { sessionStatusUiMapping } from "../../types/session";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


type SessionsTableProps = {
  sessionData: Session[];
  currentPage: number; // Assume 1-based indexing for currentPage
  pageSize: number;
  isLoading: boolean;
};

export default function SessionsTable({
  sessionData,
  currentPage,
  pageSize,
  isLoading,
}: SessionsTableProps) {
  const [sessions, setSessions] = useState<Session[]>(sessionData);
  const startIndex = 0; // Always start at 0
  const endIndex = Math.min(startIndex + pageSize, sessionData.length);
  useEffect(() => {
    setSessions(sessionData);
  }, [sessionData]);
  const paginatedSessions = sessions.slice(startIndex, endIndex);

  const handleDelete = async (transactionId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/sessions/${transactionId}`
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setSessions(
            sessions.filter(
              (session) => session.transactionId !== transactionId
            )
          );
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the session.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <TableContainer>
      <Table>
        <Thead bgColor="neutral.100">
          <Tr>
            <Th>ID</Th>
            <Th>Owner</Th>
            <Th>Location</Th>
            <Th>Status</Th>
            <Th>StartDate</Th>
            <Th>EndDate</Th>
            <Th>StartTime</Th>
            <Th>EndTime</Th>
            <Th>Energy (kWh)</Th>
            <Th>Revenue (EGP)</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={10}>
                <Center w="100%" h="10rem">
                  <Spinner size="lg" />
                </Center>
              </Td>
            </Tr>
          ) : paginatedSessions?.length > 0 ? (
            paginatedSessions.map((session, i) => (
              <Tr key={session?.transactionId}>
                <Td fontSize={12}>{session?.transactionId}</Td>
                <Td fontSize={12}>{session?.chargePoint?.owner}</Td>
                <Td fontSize={12}>{session?.chargePoint?.city}</Td>
                <Td fontSize={12}>
                  <Badge
                    colorScheme={sessionStatusUiMapping[session?.status]?.color}
                  >
                    {sessionStatusUiMapping[session?.status]?.label}
                  </Badge>
                </Td>
                <Td fontSize={12}>{session?.startTime?.split("T")[0]}</Td>
                <Td fontSize={12}>{session?.endTime?.split("T")[0]}</Td>
                <Td fontSize={12}>
                  {session?.startTime?.split("T")[1].slice(0, 5)}
                </Td>
                <Td fontSize={12}>
                  {session?.endTime?.split("T")[1].slice(0, 5)}
                </Td>
                <Td fontSize={12}>{session?.energyConsumed}</Td>
                <Td fontSize={12}>{session?.revenue}</Td>
                <Td fontSize={12}>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(session.transactionId)}
                  >
                    <TbTrash fontSize={19} />
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={9} textAlign="center">
                No sessions found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}


import {
  Box,
  Button,
  Card,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "../../components/layout/layout";
import TablePagination from "../../components/elements/table-pagination";
import { appConfig } from "../../config";
import { Customer } from "../../types/customer";
import { TbTrash } from "react-icons/tb";
import { paths } from "../../paths";
import Swal from "sweetalert2";

export default function Customers() {
  const PAGE_TITLE = "Users";

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // New state to track data loading

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const currentPageStartIndex = currentPage * pageSize;
  const currentPageEndIndex = currentPageStartIndex + pageSize;
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  // Fetching customers data from API
  const fetchData = async () => {
    const res = await fetch(
      "https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/users"
    );
    const data = await res.json();
    setCustomers(data?.data.users || []); // Ensure we set an empty array if no users
    setFilteredCustomers(data?.data.users || []); // Ensure we set an empty array if no users
    setIsLoading(false);
    setDataLoaded(true); // Set data loaded to true after fetching
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle delete customer
  const deleteCustomer = async (email: string) => {
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
          await fetch(
            `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/users/${email}`,
            {
              method: "DELETE",
            }
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setCustomers(
            customers.filter((customer) => customer.email !== email)
          );
          setFilteredCustomers(
            filteredCustomers.filter((customer) => customer.email !== email)
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
    <>
      <Head>
        <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
      </Head>

      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="space-md"
        px="space-md"
        py="space-sm"
      >
        <Heading as="h1" size="lg">
          {PAGE_TITLE}
        </Heading>
      </Box>

      <Card bgColor="bg.clear">
        <TableContainer>
          <Table>
            <Thead bgColor="neutral.100">
              <Tr>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>ID Tag</Th>
                <Th>Sessions</Th>
                <Th>
                  <Box>Energy (kWh)</Box>
                  <Box mt="space-xs" fontSize="xs">
                    (Dec 2023)
                  </Box>
                </Th>
                <Th>
                  <Box>Paid (EGP)</Box>
                  <Box mt="space-xs" fontSize="xs">
                    (Dec 2023)
                  </Box>
                </Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading && !dataLoaded ? ( // Show loading only before data is loaded
                <Tr>
                  <Td colSpan={9}>
                    <Center w="100%" h="10rem">
                      <Spinner size="lg" />
                    </Center>
                  </Td>
                </Tr>
              ) : filteredCustomers.length === 0 ? (
                <Tr>
                  <Td colSpan={9}>
                    <Center w="100%" h="10rem">
                      <Text>No data found</Text>{" "}
                    </Center>
                  </Td>
                </Tr>
              ) : (
                filteredCustomers
                  .slice(currentPageStartIndex, currentPageEndIndex)
                  .map((customer, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{customer._id}</Td>
                        <Td>{customer.email}</Td>
                        <Td>{customer.idTag}</Td>
                        <Td>{customer.sessions}</Td>
                        <Td>{customer.energy}</Td>
                        <Td>
                          {Number(customer.paid.toFixed()).toLocaleString()}
                        </Td>
                        <Td>
                          <Box display="flex" gap="space-xs">
                            <Button
                              colorScheme="green"
                              size="sm"
                              as={Link}
                              href={{
                                pathname: paths.customers.edit,
                                query: {
                                  email: customer.email,
                                },
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() => deleteCustomer(customer.email)}
                            >
                              <TbTrash fontSize={18} />
                            </Button>
                          </Box>
                        </Td>
                      </Tr>
                    );
                  })
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {filteredCustomers.length > 0 && (
          <TablePagination
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentTotalPages={totalPages}
          />
        )}
      </Card>
    </>
  );
}

Customers.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

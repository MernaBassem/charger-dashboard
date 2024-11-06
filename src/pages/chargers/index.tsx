import { Box, Button, Card, Heading, Icon, filter } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import ChargersFilters from "../../components/chargers/chargers-filters";
import ChargersTable from "../../components/chargers/chargers-table";
import TablePagination from "../../components/elements/table-pagination";
import Layout from "../../components/layout/layout";
import { appConfig } from "../../config";
import { paths } from "../../paths";

import useSWR from "swr";
import { ChargerModel } from "../../types/charger";

export default function Chargers() {
  const PAGE_TITLE = "Chargers";

  const [chargersstate, setChargers] = useState<ChargerModel[]>([]);
  const [filteredChargers, setFilteredChargers] =
    useState<ChargerModel[]>(chargersstate);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    const res = await fetch(
      "https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers"
    );
    const data = await res.json();

    setChargers(data.data.chargers);
    setFilteredChargers(data.data.chargers);
    setIsLoading(false);

    return data;
  };
  const { data, error } = useSWR("Chargers", fetchData);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const currentPageStartIndex = currentPage * pageSize; //0
  const currentPageEndIndex = currentPageStartIndex + pageSize;
  const currentTotalPages = Math.ceil(filteredChargers.length / pageSize);
  const currentPages = Math.ceil(currentPageEndIndex / 20);

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
        <Button
          as={Link}
          href={paths.chargers.add}
          colorScheme="primary"
          leftIcon={<Icon as={TbPlus} />}
        >
          Add Charger
        </Button>
      </Box>

      <Card bgColor="bg.clear">
        <ChargersFilters
          setFilteredChargers={setFilteredChargers}
          chargersstate={chargersstate}
        />
        <ChargersTable
          filteredChargers={filteredChargers}
          currentPageStartIndex={currentPageStartIndex}
          currentPageEndIndex={currentPageEndIndex}
          isLoading={isLoading}
        />
        <TablePagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentTotalPages={currentTotalPages}
        />
      </Card>
    </>
  );
}

Chargers.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

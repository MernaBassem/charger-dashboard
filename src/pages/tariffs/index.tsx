import { Box, Button, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import TariffsTable from "../../components/tariffs/tariffs-table";
import { appConfig } from "../../config";
import { owners } from "../../data/chargers";
import { paths } from "../../paths";

export default function Tariffs() {
  const PAGE_TITLE = "Tariffs";

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

      <Box p="space-md">
        {owners.map((o) => (
          <Box key={o} mb="space-md">
            <Box display="flex" gap="space-md">
              <Heading mb="space-sm" fontSize="md">
                {o}
              </Heading>
              <Button
                as={Link}
                href={{ pathname: paths.tariffs.edit, query: { ownerId: o } }}
                colorScheme="green"
                size="sm"
              >
                Edit
              </Button>
            </Box>
            <TariffsTable />
          </Box>
        ))}
      </Box>
    </>
  );
}

Tariffs.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import ChargerForm from "../../components/chargers/charger-form";
import Layout from "../../components/layout/layout";
import { appConfig } from "../../config";

export default function AddCharger() {
  const PAGE_TITLE = "Add Charger";

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
        <ChargerForm />
      </Box>
    </>
  );
}

AddCharger.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

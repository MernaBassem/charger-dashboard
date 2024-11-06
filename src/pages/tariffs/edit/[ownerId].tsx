import { Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";
import { appConfig } from "../../../config";

export default function EditTariffs() {
  const PAGE_TITLE = "Edit Tariffs";
  const {
    query: { ownerId },
  } = useRouter();

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
        <Box maxW="lg" mx="auto">
          <Heading mb="space-md" fontSize="md">
            {ownerId}
          </Heading>
          <Box display="flex" flexWrap={{ base: "wrap", lg: "nowrap" }} gap="space-md" maxW="lg" mb="space-md">
            <FormControl>
              <FormLabel>AC Tariff (EGP)</FormLabel>
              <Input bgColor="bg.clear" />
            </FormControl>
            <FormControl>
              <FormLabel>DC Tariff (EGP)</FormLabel>
              <Input bgColor="bg.clear" />
            </FormControl>
          </Box>
          <Button colorScheme="primary">Submit</Button>
        </Box>
      </Box>
    </>
  );
}

EditTariffs.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

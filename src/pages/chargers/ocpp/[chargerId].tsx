import { Box, Card, CardBody, Heading, Input, Select, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import ConfirmPopover from "../../../components/elements/confirm-popover";
import Layout from "../../../components/layout/layout";
import { appConfig } from "../../../config";

export default function ChargerOCPP() {
  const {
    query: { chargerId },
  } = useRouter();
  const PAGE_TITLE = `OCPP - Charger ${chargerId}`;

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

      <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap="space-md" p="space-md">
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Unlock Connector
            </Heading>
            <Select>
              <option>One</option>
              <option>Two</option>
            </Select>
            <ConfirmPopover buttonText="Unlock Connector" />
          </CardBody>
        </Card>
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Get Configuration
            </Heading>
            <Select>
              <option>ConnectionTimeOut (in seconds)</option>
              <option>Config 2</option>
            </Select>
            <ConfirmPopover buttonText="Get Configuration" />
          </CardBody>
        </Card>
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Change Configuration
            </Heading>
            <Select>
              <option>ConnectionTimeOut (in seconds)</option>
              <option>Config 2</option>
            </Select>
            <ConfirmPopover buttonText="Change Configuration" />
          </CardBody>
        </Card>
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Remote Start Transaction
            </Heading>
            <Select>
              <option>One</option>
              <option>Two</option>
            </Select>
            <Input placeholder="Email" />
            <ConfirmPopover buttonText="Remote Start Transaction" />
          </CardBody>
        </Card>
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Remote Stop Transaction
            </Heading>
            <Select>
              <option>One</option>
              <option>Two</option>
            </Select>
            <Input placeholder="Email" />
            <ConfirmPopover buttonText="Remote Start Transaction" />
          </CardBody>
        </Card>
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Trigger Message
            </Heading>
            <Select>
              <option>BootNotificationRequest</option>
              <option>Message 2</option>
            </Select>
            <Select>
              <option>One</option>
              <option>Two</option>
            </Select>
            <ConfirmPopover buttonText="Trigger Message" />
          </CardBody>
        </Card>
        <Card>
          <CardBody display="flex" flexDirection="column" alignItems="flex-start" gap="space-sm">
            <Heading as="h6" fontSize="md">
              Reset
            </Heading>
            <Text>Attention: This operation will reboot the charger.</Text>
            <ConfirmPopover buttonColorScheme="red" buttonText="Reset" />
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

ChargerOCPP.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

import { Avatar, Box, Button, Card, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../../components/layout/layout";
import { appConfig } from "../../config";
import { users } from "../../data/users";

export default function Account() {
  const PAGE_TITLE = "Account";

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

      <Box display="flex" flexDirection="column" gap="space-md" maxW="container.xl" p="space-md">
        <Card bgColor="bg.clear">
          <Box as="header" p="space-md" bgColor="neutral.100">
            <Heading as="h6" id="basic-information" size="sm">
              Basic Information
            </Heading>
          </Box>
          <Box as="form" display="flex" flexDirection="column" gap="space-md" p="space-md">
            <Box display="flex" alignItems="center" gap="space-md">
              <Avatar src={users[0].image.path} name={users[0].name} size="lg" bgColor="primary.light" />
              <Box display="flex" flexDirection="column" gap="space-xs">
                <Text fontWeight="semibold">Profile Image</Text>
                <Button colorScheme="primary" size="sm" variant="outline">
                  Update
                </Button>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap="space-md">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" gap="space-md">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Email</FormLabel>
                <Input />
              </FormControl>
            </Box>
            {/* <Box display="flex" justifyContent="flex-end">
              <Button colorScheme="primary" variant="outline">
                Save Changes
              </Button>
            </Box> */}
         
        {/* <Card bgColor="bg.clear"> */}
          {/* <Box as="header" p="space-md" bgColor="neutral.100">
            <Heading as="h6" id="pass-security" size="sm">
              Password & Security
            </Heading>
          </Box> */}
          {/* <Box as="form" display="flex" flexDirection="column" gap="space-md" p="space-md"> */}
            <Box display="flex" alignItems="center" gap="space-md">
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" gap="space-md">
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button colorScheme="primary" variant="outline">
                Save Changes
              </Button>
            </Box>
          </Box>
        {/* </Card>  */}
        {/* </Box> */}
        </Card>
      </Box>
    </>
  );
}

Account.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

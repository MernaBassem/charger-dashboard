import { Box, Center, Divider, Heading, Icon, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { MdBarChart, MdDonutSmall, MdScore, MdTableChart } from "react-icons/md";
import logoImage from "../../../public/assets/images/logo.png";
import AuthForm from "../../components/auth-form/auth-form";
import { appConfig } from "../../config";
import usePageProtect from "../../hooks/use-page-protect";
import { primaryColor, secondaryColor } from "../../theme/foundations/colors";

export default function SignInPage() {
  // Show loading screen until page loads completely
  const { LoadingScreen, isCheckingAuth } = usePageProtect({ allow: "UNAUTHENTICATED" });

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>{`Sign In | ${appConfig.title}`}</title>
      </Head>

      <Box display="flex" flexDirection={{ base: "column", md: "row" }} minH={{ md: "100vh" }}>
        <Box position="relative" w={{ md: "55%" }} color="white">
          <Center
            position="absolute"
            top="0"
            zIndex="-1"
            w="full"
            h="full"
            bgGradient={`linear(to-br, ${primaryColor[900]}, ${secondaryColor[900]})`}
          >
            <Image src={logoImage} alt={appConfig.owner} style={{ opacity: 0.04 }} />
          </Center>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap="space-lg"
            h="full"
            p="space-lg"
          >
            <Box display="flex" alignItems="center" gap="space-xs">
              <Image src={logoImage} alt={appConfig.owner} width={50} height={50} />
              <Heading
                as="h1"
                size="lg"
                bgGradient={`linear(to-b, ${primaryColor[400]}, ${secondaryColor[300]})`}
                bgClip="text"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {appConfig.owner}
              </Heading>
            </Box>
            <Box>
              <Heading as="h2" size="md" mb="space-xs" letterSpacing="wide">
                {appConfig.title}
              </Heading>
              <Divider mb="space-xs" width="5rem" borderColor="white" borderWidth="1.5px" borderRadius="md" />
              <Text mb="space-md" color="neutral.300">
                {appConfig.welcome} {appConfig.description}
              </Text>
              <Box display="flex" alignItems="center" gap="space-xs" fontSize="3xl">
                <Icon as={MdTableChart} />
                <Icon as={MdBarChart} />
                <Icon as={MdDonutSmall} />
                <Icon as={MdScore} />
              </Box>
            </Box>
            <Text fontSize="sm">{appConfig.copyright}</Text>
          </Box>
        </Box>
        <Center w={{ md: "45%" }} p="space-md" bgColor="bg.body">
          <AuthForm />
        </Center>
      </Box>
    </>
  );
}

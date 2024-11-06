import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../../public/assets/images/logo.png";
import { appConfig } from "../../../config";
import { paths } from "../../../paths";

export default function SideNavHeader() {
  return (
    <Box as="header" p="space-md">
      <Box as={Link} href={paths.index} display="flex" alignItems="center" gap="space-xs" whiteSpace="nowrap">
        <Image src={logoImage} alt={appConfig.owner} width={50} height={50} />
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap="0.5" letterSpacing="wide">
          <Heading color="white" fontSize="xl" textTransform="uppercase">
            {appConfig.owner}
          </Heading>
          <Text color="neutral.300" fontWeight="semibold">
            {appConfig.title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

import { Box } from "@chakra-ui/react";
import { appConfig } from "../../config";

export default function Footer() {
  return (
    <Box
      as="footer"
      borderTop="1px"
      borderColor="border"
      mt='15px'
      p="space-sm"
      bgColor="bg.clear"
      color="text.secondary"
      fontSize="sm"
      textAlign="center"
    >
      {appConfig.copyright}
    </Box>
  );
}

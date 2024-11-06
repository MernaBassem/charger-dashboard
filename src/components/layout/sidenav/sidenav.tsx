import { Box } from "@chakra-ui/react";
import SideNavBody from "./sidenav-body";
import SideNavHeader from "./sidenav-header";

export default function SideNav() {
  return (
    <Box
      as="nav"
      display={{ base: "none", lg: "flex" }}
      flexDirection="column"
      position="fixed"
      top="0"
      zIndex="docked"
      w="18rem"
      h="100vh"
      overflow="auto"
      bgColor="bg.filled"
    >
      <SideNavHeader />
   
    <hr />
      <br/>
      <SideNavBody />
    </Box>
  );
}

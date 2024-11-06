import { Box, useDisclosure } from "@chakra-ui/react";
import usePageProtect from "../../hooks/use-page-protect";
import Footer from "./footer";
import Header from "./header";
import SideNav from "./sidenav/sidenav";
import SideNavDrawer from "./sidenav/sidenav-drawer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { LoadingScreen, isCheckingAuth } = usePageProtect({ allow: "AUTHENTICATED" });
  const {
    isOpen: isSideNavDrawerOpen,
    onClose: onCloseSideNavDrawer,
    onToggle: onToggleSideNavDrawer,
  } = useDisclosure({ defaultIsOpen: false });

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  const SIDE_NAV_WIDTH = "18rem";

  return (
    <Box display="flex" position="relative" minH="100vh" bgColor="bg.body" color="text.primary">
      <SideNav />
      <SideNavDrawer isOpen={isSideNavDrawerOpen} onClose={onCloseSideNavDrawer} />
      <Box
        display="flex"
        flexDirection="column"
        w={{ base: "full", lg: `calc(100% - ${SIDE_NAV_WIDTH})` }}
        marginInlineStart={{ base: "0", lg: SIDE_NAV_WIDTH }}
      >
        <Header onToggleSideNavDrawer={onToggleSideNavDrawer} />
        <Box as="main" flexGrow="1">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import SideNavBody from "./sidenav-body";
import SideNavHeader from "./sidenav-header";

type SideNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideNavDrawer({ isOpen, onClose }: SideNavDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
      <DrawerOverlay />
      <DrawerContent bgColor="bg.filled">
        <DrawerCloseButton color="white" />
        <DrawerHeader p="0">
          <SideNavHeader />
        </DrawerHeader>
        <DrawerBody p="0">
          <SideNavBody />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

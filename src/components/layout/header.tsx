import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TbMenu2, TbSettings } from "react-icons/tb";
import { AuthContext } from "../../contexts/auth-context";
import { users } from "../../data/users";
import { paths } from "../../paths";
import { FiChevronDown } from "react-icons/fi";

type HeaderProps = {
  onToggleSideNavDrawer: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Header({
  onToggleSideNavDrawer,
  ...rest
}: HeaderProps) {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();

  const user = users[0];

  const handleSignOut = () => {
    signOut();
    router.push(paths.auth.signin);
  };

  return (
    <>
      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        gap="space-md"
        position="sticky"
        top="0"
        zIndex="sticky"
        borderBottom="1px"
        borderColor="border"
        px="space-sm"
        py="space-sm"
        bgColor="bg.opaque"
      >
        <Spacer />

        <Flex
          ml={{ base: 0, md: 2 }}
          px={{ base: 0, md: 2 }}
          height="10"
          bg={useColorModeValue("white", "gray.900")}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue("gray.200", "gray.700")}
          justifyContent={{ base: "space-between" }}
          {...rest}
        >
          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={onToggleSideNavDrawer}
            variant="outline"
            icon={<Icon as={TbMenu2} />}
            aria-label="open menu"
          />

          <HStack spacing={{ base: "0", md: "6" }}>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar size="sm" />

                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{user.name}</Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>

                <MenuList>
                  <Box px="space-sm" py="space-xs">
                    <Text fontWeight="semibold">{user.name}</Text>
                    <Text color="text.secondary">{user.email}</Text>
                  </Box>
                  <MenuDivider />
                  <MenuItem
                    as={Link}
                    href={paths.account.index}
                    icon={
                      <Icon
                        as={TbSettings}
                        boxSize="6"
                        color="text.secondary"
                      />
                    }
                  >
                    Account
                  </MenuItem>
                  <MenuDivider />
                  <Center py="space-xs">
                    <Button
                      colorScheme="primary"
                      variant="outline"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </Center>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

// --------------------------------------------------------------------------
// import {
//   Avatar,
//   Box,
//   Button,
//   Center,
//   Icon,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
//   Text,
//   VStack,

// } from "@chakra-ui/react";
// import { ChevronDownIcon} from '@chakra-ui/icons'
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useContext } from "react";
// import { TbMenu2, TbSettings } from "react-icons/tb";
// import { AuthContext } from "../../contexts/auth-context";
// import { users } from "../../data/users";
// import { paths } from "../../paths";

// type HeaderProps = {
//   onToggleSideNavDrawer: (e: React.MouseEvent<HTMLButtonElement>) => void;
// };

// export default function Header({ onToggleSideNavDrawer }: HeaderProps) {
//   const { signOut } = useContext(AuthContext);
//   const router = useRouter();
//   const user = users[0];

//   const handleSignOut = () => {
//     signOut();
//     router.push(paths.auth.signin);
//   };

//   return (
//     <>
//     <Box
//       as="header"
//       display="flex"
//       justifyContent="space-between"
//       gap="space-md"
//       position="sticky"
//       top="0"
//       zIndex="sticky"
//       borderBottom="1px"
//       borderColor="border"
//       px="space-md"
//       py="space-sm"
//       bgColor="bg.opaque"
//     >

//       <IconButton
//         aria-label="Toggle side drawer"
//         icon={<Icon as={TbMenu2} boxSize="8" />}
//         display={{ base: "flex", lg: "none" }}
//         onClick={onToggleSideNavDrawer}
//       />

//       <Box ml="auto" bg="blue"  w={100} >

//         <Menu>

//           <MenuButton>

//             <Avatar size="sm" />
//             <Text fontWeight="semibold">{user.name}</Text>

//             <ChevronDownIcon w={6} h={8}/>
//           </MenuButton>
// <MenuList>
//   <Box px="space-sm" py="space-xs">
//     <Text fontWeight="semibold">{user.name}</Text>
//     <Text color="text.secondary">{user.email}</Text>
//   </Box>
//   <MenuDivider />
//   <MenuItem
//     as={Link}
//     href={paths.account.index}
//     icon={<Icon as={TbSettings} boxSize="6" color="text.secondary" />}
//   >
//     Account
//   </MenuItem>
//   <MenuDivider />
//   <Center py="space-xs">
//     <Button colorScheme="primary" variant="outline" onClick={handleSignOut}>
//       Sign Out
//     </Button>
//   </Center>
// </MenuList>
//         </Menu>
//       </Box>

//     </Box>

//     </>
//   );
// }

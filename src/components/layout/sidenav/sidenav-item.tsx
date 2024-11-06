import { As, Button, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type SideNavItemProps = {
  label: string;
  path: string;
  icon: As;
};

export default function SideNavItem({ label, path, icon }: SideNavItemProps) {
  const router = useRouter();
  const isSelected = router.pathname === path;

  return (
    <Button
      as={NextLink}
      href={path}
      colorScheme="primary"
      leftIcon={<Icon as={icon} boxSize="6" />}
      iconSpacing="space-sm"
      justifyContent="flex-start"
      {...(!isSelected && {
        variant: "ghost",
        color: "white",
        _hover: { bgColor: "whiteAlpha.400" },
      })}
      fontWeight={isSelected ? "semibold" : "normal"}
      textTransform="capitalize"
    >
      {label}
    </Button>
  );
}

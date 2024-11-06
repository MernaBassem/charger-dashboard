import { Box } from "@chakra-ui/react";
import {
  // TbCash,                 // (Revenue) icon 
  TbChargingPile,
  TbCoinPound,
  TbDeviceAnalytics,
  TbMapPin2,
  TbPlugConnected,
  TbSettings,
  TbUsers,
  TbChartBar  
} from "react-icons/tb";
import { paths } from "../../../paths";
import SideNavItem from "./sidenav-item";

export default function SideNavBody() {
  const navLinks = [
    { label: "Overview", path: paths.index, icon: TbDeviceAnalytics },
    { label: "Chargers", path: paths.chargers.index, icon: TbChargingPile },
    { label: "Locations", path: paths.locations.index, icon: TbMapPin2 },
    { label: "Sessions", path: paths.sessions.index, icon: TbPlugConnected },
    { label: "Revenue", path: paths.revenue.index, icon: TbChartBar   },
    { label: "Tariffs", path: paths.tariffs.index, icon: TbCoinPound },
    { label: "Users", path: paths.customers.index, icon: TbUsers },
    { label: " Account", path: paths.account.index, icon: TbSettings },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="space-md" p="space-md">
      {navLinks.map((navLink, i) => (
        <SideNavItem key={i} label={navLink.label} path={navLink.path} icon={navLink.icon} />
      ))}
    </Box>
  );
}

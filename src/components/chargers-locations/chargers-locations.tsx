import {
  Box,
  Card,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import Map, { FullscreenControl, MapRef, Marker, NavigationControl, Popup, ScaleControl } from "react-map-gl";
import ccs2Image from "../../../public/assets/images/ccs_2.png";
import chademoImage from "../../../public/assets/images/chademo.png";
import type2Image from "../../../public/assets/images/type_2.png";
import GBTImage from "../../../public/assets/images/GBT 2.jpg"
import { mapBoxConfig } from "../../config";
import LocationsList from "./locations-list";
import { chargers } from "../../types/map";

const connectorsStandardsMap: Record<string, StaticImageData> = {
  
  "Type 2": type2Image,
  "CHADEMO": chademoImage,
  "CCS 2": ccs2Image,
  "GB/T":GBTImage
};

type dataMap = {
  mapData: chargers[]
};

export default function ChargersLocations({ mapData }: dataMap) {

  const [currentChargerId, setCurrentChargerId] = useState<string>("");
  const mapRef = useRef<MapRef | null>(null);
  const { isOpen, onClose, onToggle } = useDisclosure({ defaultIsOpen: false });

  const handleSelectLocation = (id: string) => {
    const el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentChargerId(id);

    const map = mapRef.current;
    const charger = mapData.find((charger) => charger.id === id);
    if (map && charger) {
      map.flyTo({
        center: [charger.longitude, charger.latitude],
        zoom: 16,
      });
    }
  };

  const formatConnectors = (connectors: any) => {
    const counter: Record<string, any> = {};
    connectors.forEach((c: any) => {
      if (counter[c.name]) {
        counter[c.name].count = counter[c.name].count + 1;
      } else {
        counter[c.name] = { ...c, count: 1 };
      }
    });
    return Object.keys(counter).map((c: any) => ({
      name: c,
      connectorId: c.connectorId,
      count: counter[c].count,
      voltage: counter[c].voltage,
      type: counter[c].type,
    }));
  };
  {mapData.map((c, i) => {
    if (!c.latitude || !c.longitude || isNaN(c.latitude) || isNaN(c.longitude)) {
      console.error(`Invalid coordinates for charger with id: ${c.id}`);
      console.log("c.latitude",c.latitude);
      return null; // Skip this Marker if coordinates are invalid
  }})}
  return (
    <Card display="flex" flexDirection={{ base: "column", md: "row" }} h="80vh">
      <Box display={{ base: "none", md: "flex" }}>
        <LocationsList mapData={mapData} currentChargerId={currentChargerId} handleSelectLocation={handleSelectLocation} />
      </Box>
      <Box display={{ base: "initial", md: "none" }}>
        <IconButton
          aria-label="Open locations list"
          variant="outline"
          icon={<FaListUl />}
          display={{ base: "flex", xl: "none" }}
          m="space-sm"
          ml="auto"
          onClick={onToggle}
        />
      </Box>
      <Drawer placement="left" size="md" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent onClick={onClose}>
          <DrawerCloseButton />
          <DrawerBody p="0">
            <LocationsList mapData={mapData} currentChargerId={currentChargerId} handleSelectLocation={handleSelectLocation} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box flexGrow="1" flexShrink="1">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: mapData[0]?.latitude || 0,
            longitude: mapData[0]?.longitude || 0,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={mapBoxConfig.accessToken}
        >
          
          <FullscreenControl />
          <NavigationControl />
          <ScaleControl />
          {mapData
  .filter(c => c.latitude && c.longitude && !isNaN(c.latitude) && !isNaN(c.longitude))
  .map((c, i) => (
    <Box key={i} sx={{ "& button": { mt: "1rem", mr: "1rem" } }}>
      {currentChargerId && currentChargerId === c.id && (
        <Popup
          latitude={c.latitude}
          longitude={c.longitude}
          anchor="top"
          closeOnClick={false}
          closeOnMove={false}
          closeButton={false}
          maxWidth="38rem"
          style={{ filter: "drop-shadow(1px 1px 8px rgba(0,0,0,0.2))" }}
        >
                  <Box display="flex" flexDirection="column" alignItems="flex-start" gap="space-md" p="space-lg" >
                    <HStack> 
                      <span>{c?.id} </span>  
                      <Text fontWeight="semibold" >{c?.city}</Text>
                       <span> | </span>
                      <Text fontWeight="semibold">{c?.owner}</Text>
                    </HStack>
                    <Center w="full" >
                      {formatConnectors(c.connectors).map((conn) => (
                        <VStack key={conn?.connectorId} gap="0">
                          <Image src={connectorsStandardsMap[conn?.name]} alt={conn.name} width={32} height={32} />
                          <Text fontWeight="semibold" >{conn?.name}</Text>
                          <Text px={5}>{conn.voltage}kW {conn?.type}</Text>
                          <Text  fontWeight="bold"> x{conn?.count}</Text>
                        </VStack>
                      ))}
                    </Center>
                  </Box>
                </Popup>
              )}
             <Marker
        color="blue"
        latitude={c.latitude}
        longitude={c.longitude}
        style={{
          filter: c.id === currentChargerId ? `drop-shadow(0px 0px 12px blue)` : "initial",
        }}
        onClick={() => handleSelectLocation(c.id)}
      />
    </Box>
          ))}
        </Map>
  
      </Box>
    </Card>
  );

  }
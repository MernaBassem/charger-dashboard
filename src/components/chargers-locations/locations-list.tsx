import { Accordion, AccordionButton, AccordionItem, Box, Flex, Grid, Spacer, Text, VStack } from "@chakra-ui/react";
import { chargers } from "../../types/map";

type LocationsListProps = {
  currentChargerId: string;
  handleSelectLocation: (id: string) => void; 
  mapData:chargers[]
};

export default function LocationsList({mapData, currentChargerId, handleSelectLocation }: LocationsListProps) {
  return (
    <Accordion allowToggle index={+currentChargerId - 1} flexGrow="1" w="md" overflow="auto" bgColor="bg.clear">
      {mapData.map((charger, i) => (
        <Box key={i} id={charger?.id}>
          <AccordionItem borderBottom="none">
            <AccordionButton
              gap="space-lg"
              py="space-lg" 
              _expanded={{ bgColor: "primary.50" }}
              onClick={() => handleSelectLocation(charger?.id)}
            >
  <Grid templateColumns='repeat(3, 1fr)' gap={8}>
  <Box w='150px' h='10'>{charger?.id}</Box>
              <Box w='150px' h='10'>
              <VStack alignItems="flex-start" rowGap="1"  textAlign="left">
                <Text  >{charger?.owner}</Text>
                <Text color="text.secondary">{charger?.city}</Text>
              </VStack></Box></Grid>
            </AccordionButton>
          </AccordionItem>
        </Box>
      ))}
    </Accordion>
  );
}

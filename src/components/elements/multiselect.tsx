import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/react";
import { TbChevronDown } from "react-icons/tb";

type MultiSelectProps = {
  name: string;
  options: string[];
  optionsLabelMapping?: Record<string, any>;
  value: string[];
  handleChangeFilter: (name: string, value: string[]) => void;
};

export default function MultiSelect({
  name,
  options,
  optionsLabelMapping,
  value,
  handleChangeFilter,
}: MultiSelectProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" rightIcon={<TbChevronDown fontSize="1rem" />} textTransform="capitalize">
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent maxW="3xs" boxShadow="md">
        <PopoverArrow />
        <PopoverBody maxH="2xs" overflow="auto">
          <CheckboxGroup value={value} onChange={(value) => handleChangeFilter(name, value as string[])}>
            <Box display="flex" flexDirection="column" gap="space-sm" alignItems="flex-start" py="space-sm">
              {options.map((o, i) => (
                <Checkbox key={i} name="type" value={o} textTransform="capitalize">
                  {optionsLabelMapping ? optionsLabelMapping[o].label : o}
                </Checkbox>
              ))}
            </Box>
          </CheckboxGroup>
        </PopoverBody>
        <PopoverFooter py="space-sm">
          <Box display="flex" justifyContent="center" gap="space-sm">
            <Button variant="outline" onClick={() => handleChangeFilter(name, [])}>
              Clear All
            </Button>
            <PopoverCloseButton position="static" w="auto" h="auto" m="0" p="0">
              <Button colorScheme="primary">Done</Button>
            </PopoverCloseButton>
          </Box>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

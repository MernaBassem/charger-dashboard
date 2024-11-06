import {
  Button,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";

type ConfirmPopoverProps = {
  buttonText: string;
  buttonColorScheme?: string;
};

export default function ConfirmPopover({ buttonText, buttonColorScheme = "blue" }: ConfirmPopoverProps) {
  const toast = useToast();

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme={buttonColorScheme}>{buttonText}</Button>
      </PopoverTrigger>
      <PopoverContent boxShadow="md">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading as="h6" fontSize="md">
            Confirmation
          </Heading>
        </PopoverHeader>
        <PopoverBody>Are you sure you want to proceed with this OCPP Operation?</PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme="primary"
            variant="outline"
            onClick={() =>
              toast({
                title: "Done.",
                description: "OCPP operation has been completed.",
                status: "info",
                variant: "top-accent",
                duration: 5000,
                isClosable: true,
              })
            }
          >
            Confirm
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

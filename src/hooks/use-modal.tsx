import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

type ModalState = {
  heading: string;
  message: string;

};

export default function useModal() {
  const initialModalState: ModalState = { heading: "", message: "" };
  const [modalState, setModalState] = useState(initialModalState);

  const onOpen = ({ heading, message }: ModalState) => {
    setModalState({ heading, message });
  };
  const onClose = () => {
    setModalState(initialModalState);
  };

  const ModalComponent = () => (
   
   <> 
   <Modal isOpen={Boolean(modalState.message)} onClose={onClose} motionPreset="slideInTop" isCentered> 
      <ModalOverlay /> 

      <ModalContent>
        <ModalHeader color="red.500">{modalState.heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalState.message}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Ok</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>

    </>
  );

  return { handleOpenModal: onOpen, Modal: ModalComponent };
}

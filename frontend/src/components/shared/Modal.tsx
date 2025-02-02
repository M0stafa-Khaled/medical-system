import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

interface IProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  description?: string | ReactNode;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, description, children }: IProps) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <ChakraModal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className="!bg-foreground !text-black dark:!text-white !font-sans">
          <ModalCloseButton />
          <ModalHeader className="font-sans mt-6">{title}</ModalHeader>
          <ModalBody pb={6}>
            <p className="text-black/70 dark:text-white/70 font-light mb-6 text-sm lg:text-base">
              {description}
            </p>
            {children}
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;

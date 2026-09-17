import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog = ({
  isOpen,
  title = "Confirmar exclusão",
  itemName,
  isDeleting = false,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Tem certeza que deseja excluir
              {itemName ? (
                <>
                  {" "}
                  <Text as="span" fontWeight="bold">
                    {itemName}
                  </Text>
                </>
              ) : (
                " este registro"
              )}
              ?
            </Text>

            <Text mt={2} color="gray.500" fontSize="sm">
              Esta ação não poderá ser desfeita.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              isDisabled={isDeleting}
            >
              Cancelar
            </Button>

            <Button
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
              isLoading={isDeleting}
              loadingText="Excluindo"
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
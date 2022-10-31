import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

type CommonAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  cancelLabel?: string;
  children: {
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
  };
};

function CommonAlert({
  isOpen,
  onClose,
  cancelLabel,
  children,
}: CommonAlertProps): JSX.Element {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{children.header}</AlertDialogHeader>
          <AlertDialogBody>{children.content}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelLabel || '취소'}
            </Button>
            {children.footer}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default CommonAlert;

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Text,
  ModalCloseButton,
  Input,
  Stack,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useProjectItemModal from '@/hooks/use-project-item-modal';

function ProjectItemModifyModal(): JSX.Element {
  const [requiredValidationResult, setRequiredValidationResult] = useState({
    author: false,
    name: false,
    description: false,
  });
  const { isOpen, projectItem, closeModal, modifyProjectItem, onModalSubmit } =
    useProjectItemModal();
  const { author, name, description, deployLink, githubLink } = projectItem;

  const clearValidationResult = () => {
    setRequiredValidationResult({
      author: false,
      name: false,
      description: false,
    });
  };

  const validateRequiredFields = () => {
    setRequiredValidationResult({
      author: !author,
      name: !name,
      description: !description,
    });
    return author && name && description;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearValidationResult();
    modifyProjectItem({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateRequiredFields()) {
      onModalSubmit();
    }
  };

  const onCloseModal = () => {
    closeModal();
    clearValidationResult();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <form>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontFamily="logo" fontWeight="400" textAlign="center">
              프로젝트 추가
            </Text>
          </ModalHeader>

          <ModalBody>
            <Stack gap="5px" padding="10px 0">
              <Input
                placeholder="개발자"
                value={author}
                name="author"
                onChange={onChange}
                focusBorderColor="mint.500"
                isInvalid={requiredValidationResult.author}
              />
              <Input
                placeholder="프로젝트 명"
                value={name}
                name="name"
                onChange={onChange}
                focusBorderColor="mint.500"
                isInvalid={requiredValidationResult.name}
              />
              <Input
                placeholder="프로젝트 설명"
                value={description}
                name="description"
                onChange={onChange}
                focusBorderColor="mint.500"
                isInvalid={requiredValidationResult.description}
              />
              <Input
                placeholder="배포 링크(Optional)"
                value={deployLink}
                name="deployLink"
                onChange={onChange}
                focusBorderColor="mint.500"
              />
              <Input
                placeholder="깃허브 링크(Optional)"
                value={githubLink}
                name="githubLink"
                onChange={onChange}
                focusBorderColor="mint.500"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="mint"
              mr="10px"
              onClick={onSubmit}
              type="submit"
            >
              추가
            </Button>
            <Button onClick={onCloseModal}>취소</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ProjectItemModifyModal;

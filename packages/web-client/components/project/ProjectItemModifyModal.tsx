import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Text,
  ModalCloseButton,
  Stack,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import useProjectItemModal from '@/hooks/use-project-item-modal';
import { ProjectItemDto } from '@/apis/projects';
import UrlControl from '../form/UrlControl';
import TextControl from '../form/TextControl';
import GithubUrlControl from '../form/GithubUrlControl';

function ProjectItemModifyModal(): JSX.Element {
  const { isOpen, closeModal, projectItem, onModalSubmit } =
    useProjectItemModal();
  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm({ mode: 'onChange', defaultValues: { ...projectItem } });

  const onCloseModal = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data: ProjectItemDto) => {
    await onModalSubmit(data);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontFamily="logo" fontWeight="400" textAlign="center">
              프로젝트 추가
            </Text>
          </ModalHeader>

          <ModalBody>
            <Stack gap="5px" padding="10px 0">
              <TextControl
                name="author"
                label="개발자"
                control={control}
                placeholder="개발자 이름을 입력해주세요"
                required
              />

              <TextControl
                name="name"
                label="프로젝트명"
                control={control}
                placeholder="프로젝트명을 입력해주세요"
                required
              />

              <TextControl
                name="description"
                label="프로젝트 설명"
                control={control}
                placeholder="프로젝트 설명을 입력해주세요"
                required
              />

              <UrlControl
                name="deployLink"
                label="배포 링크"
                control={control}
                placeholder="배포 링크를 입력해주세요"
              />

              <GithubUrlControl
                name="githubLink"
                label="깃허브 링크"
                control={control}
                placeholder="깃허브 링크를 입력해주세요"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="mint"
              mr="10px"
              type="submit"
              disabled={!isValid}
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

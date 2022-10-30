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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useProjectItemModal from '@/hooks/use-project-item-modal';
import { ProjectItemDto } from '@/apis/projects';
// import UrlControl from '../form/UrlControl';
import TextControl from '../form/TextControl';
import GithubUrlControl from '../form/GithubUrlControl';
import SelectControl from '../form/SelectControl';
import UrlControl from '../form/UrlControl';

type ProjectItemInput = Omit<ProjectItemDto, 'platform'> & {
  platform: string;
};

function ProjectItemModifyModal(): JSX.Element {
  const platformSelectOptions = [
    { name: 'WEB', value: 'web' },
    { name: 'Android', value: 'android' },
    { name: 'IOS', value: 'ios' },
    { name: 'Mobile(Android & IOS)', value: 'mobile' },
    { name: '배포하지 않았음', value: 'none' },
    { name: '기타', value: 'etc' },
  ];

  const [platform, setPlatform] = useState(platformSelectOptions[0].value);
  const { isOpen, closeModal, projectItem, onModalSubmit } =
    useProjectItemModal();
  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm<ProjectItemInput>({
    mode: 'onChange',
    defaultValues: { ...projectItem },
  });

  const onCloseModal = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data: ProjectItemInput) => {
    const platformData = (() => {
      if (data.platform === 'web') {
        return 'web';
      }
      if (data.platform === 'mobile') {
        return 'app';
      }
      return 'etc';
    })();
    await onModalSubmit({ ...data, platform: platformData });
    reset();
  };

  const onPlatformChange = (value: string) => {
    setPlatform(value);
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
              <SelectControl
                name="platform"
                label="배포 방법"
                control={control}
                required
                selectOptions={platformSelectOptions}
                onChangeValue={onPlatformChange}
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
              <GithubUrlControl
                name="githubLink"
                label="깃허브 링크"
                control={control}
                placeholder="깃허브 링크를 입력해주세요"
              />
              {platform === 'web' && (
                <UrlControl
                  name="webDeployLink"
                  label="웹 배포 링크"
                  control={control}
                  placeholder="웹 배포 링크"
                  required
                />
              )}
              {(platform === 'android' || platform === 'mobile') && (
                <UrlControl
                  name="androidDeployLink"
                  label="안드로이드 배포 링크"
                  control={control}
                  placeholder="안드로이드 앱 다운로드 링크"
                  required
                />
              )}
              {(platform === 'ios' || platform === 'mobile') && (
                <UrlControl
                  name="iosDeployLink"
                  label="IOS 배포 링크"
                  control={control}
                  placeholder="IOS 앱 다운로드 링크"
                  required
                />
              )}
              {platform === 'etc' && (
                <UrlControl
                  name="etcDeployLink"
                  label="배포 링크"
                  control={control}
                  placeholder="프로젝트 배포 링크"
                  required
                />
              )}
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

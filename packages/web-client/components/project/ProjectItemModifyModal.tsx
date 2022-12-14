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
  Flex,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useProjectItemModal, {
  initialProjectItem,
} from '@/hooks/use-project-item-modal';
import { ProjectItemDto } from '@/apis/projects';
import TextControl from '../form/TextControl';
import GithubUrlControl from '../form/GithubUrlControl';
import SelectControl from '../form/SelectControl';
import UrlControl from '../form/UrlControl';
import ImageUploadControl from '../form/ImageUploadControl';
import ProjectBlock from './ProjectBlock';
import useAuth from '@/hooks/use-auth';

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

  const [deployPlatform, setDeployPlatform] = useState(
    platformSelectOptions[0].value,
  );
  const { user } = useAuth();
  const [formValue, setFormValue] = useState<
    ProjectItemDto & { backgroundImgFile?: File }
  >({
    ...initialProjectItem,
    authorUserId: user?.id || -1,
    authorUsername: user?.username || '',
  });
  const { isOpen, closeModal, projectItem, onModalSubmit } =
    useProjectItemModal();
  const {
    handleSubmit,
    reset,
    getValues,
    watch,
    control,
    formState: { isValid },
  } = useForm<ProjectItemInput>({
    mode: 'onChange',
    defaultValues: { ...projectItem },
  });
  const toast = useToast();

  const onCloseModal = () => {
    reset();
    setFormValue({
      ...initialProjectItem,
      authorUserId: user?.id || -1,
      authorUsername: user?.username || '',
    });
    closeModal();
  };

  const deployPlatformTo = (platformStr: string): 'web' | 'app' | 'etc' => {
    if (platformStr === 'web') {
      return 'web';
    }
    if (platformStr === 'mobile') {
      return 'app';
    }
    return 'etc';
  };
  const onSubmit = async () => {
    try {
      await onModalSubmit({
        ...formValue,
        backgroundImg: undefined,
      });
      setFormValue({
        ...initialProjectItem,
        authorUserId: user?.id || -1,
        authorUsername: user?.username || '',
      });
      reset();
    } catch {
      toast({
        title: '프로젝트를 추가하지 못했습니다.',
        status: 'error',
        isClosable: true,
      });
      reset();
      closeModal();
    }
  };

  const onChange = () => {
    const values = getValues();
    setFormValue(prev => ({
      ...prev,
      ...values,
      backgroundImg: prev.backgroundImg,
      authorProfileImg: user?.profileImg || '',
      authorUserId: user?.id || -1,
      authorUsername: user?.username || '',
      platform: deployPlatformTo(values.platform),
    }));
  };

  const onChangePlatform = (value: string) => {
    setDeployPlatform(value);
    onChange();
  };

  const onChangeBackgroundImageFile = (value?: File) => {
    if (!value) {
      setFormValue(prev => ({
        ...prev,
        backgroundImg: undefined,
        backgroundImgFile: undefined,
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      const result = event.target?.result?.toString();
      if (result) {
        setFormValue(prev => ({
          ...prev,
          backgroundImg: result,
          backgroundImgFile: value,
        }));
      }
    };

    reader.readAsDataURL(value);
  };

  useEffect(() => {
    if (!user) return () => null;

    onChange();
    const subscription = watch(onChange);
    return () => subscription.unsubscribe();
  }, [watch, getValues, user]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent width="auto" style={{ maxWidth: 'initial' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontFamily="logo" fontWeight="400" textAlign="center">
              프로젝트 추가
            </Text>
          </ModalHeader>

          <ModalBody>
            <Flex>
              <Stack gap="5px" padding="10px 0" marginRight="30px">
                <ImageUploadControl
                  name="backgroundImg"
                  label="배경 이미지"
                  control={control}
                  onChangeValue={onChangeBackgroundImageFile}
                />

                <SelectControl
                  name="platform"
                  label="배포 방법"
                  control={control}
                  isRequired
                  selectOptions={platformSelectOptions}
                  onChangeValue={onChangePlatform}
                />
                <TextControl
                  name="name"
                  label="프로젝트명"
                  control={control}
                  placeholder="프로젝트명을 입력해주세요"
                  isRequired
                  maxLength={40}
                />
                <TextControl
                  name="description"
                  label="프로젝트 설명"
                  control={control}
                  placeholder="프로젝트 설명을 입력해주세요"
                  isRequired
                  maxLength={500}
                />
                <GithubUrlControl
                  name="githubLink"
                  label="깃허브 링크"
                  control={control}
                  placeholder="깃허브 링크를 입력해주세요"
                  maxLength={2083}
                />
                {deployPlatform === 'web' && (
                  <UrlControl
                    name="webDeployLink"
                    label="웹 배포 링크"
                    control={control}
                    placeholder="웹 배포 링크"
                    isRequired
                    maxLength={2083}
                  />
                )}
                {(deployPlatform === 'android' ||
                  deployPlatform === 'mobile') && (
                  <UrlControl
                    name="androidDeployLink"
                    label="안드로이드 배포 링크"
                    control={control}
                    placeholder="안드로이드 앱 다운로드 링크"
                    isRequired
                    maxLength={2083}
                  />
                )}
                {(deployPlatform === 'ios' || deployPlatform === 'mobile') && (
                  <UrlControl
                    name="iosDeployLink"
                    label="IOS 배포 링크"
                    control={control}
                    placeholder="IOS 앱 다운로드 링크"
                    isRequired
                    maxLength={2083}
                  />
                )}
                {deployPlatform === 'etc' && (
                  <UrlControl
                    name="etcDeployLink"
                    label="배포 링크"
                    control={control}
                    placeholder="프로젝트 배포 링크"
                    isRequired
                    maxLength={2083}
                  />
                )}
              </Stack>

              <ProjectBlock project={formValue} withoutLikeList />
            </Flex>
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

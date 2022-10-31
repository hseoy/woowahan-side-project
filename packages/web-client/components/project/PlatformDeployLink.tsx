import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import React from 'react';
import IconAndroid from '@/assets/svg/icon_android.svg';
import IconIos from '@/assets/svg/icon_ios.svg';
import IconWeb from '@/assets/svg/icon_web.svg';
import IconGithub from '@/assets/svg/icon_github.svg';
import IconLink from '@/assets/svg/icon_link.svg';
import Tooltip from '../common/Tooltip';

type PlatformDeployLinkProps = {
  etcDeployLink?: string;
  webDeployLink?: string;
  androidDeployLink?: string;
  iosDeployLink?: string;
  githubLink?: string;
};

function PlatformDeployLink({
  etcDeployLink,
  webDeployLink,
  androidDeployLink,
  iosDeployLink,
  githubLink,
}: PlatformDeployLinkProps): JSX.Element {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Flex gap="12px" onClick={stopPropagation}>
      {githubLink && (
        <Tooltip content={<Text>Github Repo</Text>}>
          <Link href={githubLink} target="_blank" rel="noopener noreferrer">
            <Icon
              as={IconGithub}
              _hover={{ color: '#1a1a1a' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
          </Link>
        </Tooltip>
      )}

      {androidDeployLink && (
        <Tooltip content={<Text>안드로이드 다운로드</Text>}>
          <Link
            href={androidDeployLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              as={IconAndroid}
              _hover={{ color: '#35a700' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
          </Link>
        </Tooltip>
      )}

      {iosDeployLink && (
        <Tooltip content={<Text>앱스토어 다운로드</Text>}>
          <Link href={iosDeployLink} target="_blank" rel="noopener noreferrer">
            <Icon
              as={IconIos}
              _hover={{ color: '#555555' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
          </Link>
        </Tooltip>
      )}

      {webDeployLink && (
        <Tooltip content={<Text>웹페이지</Text>}>
          <Link href={webDeployLink} target="_blank" rel="noopener noreferrer">
            <Icon
              as={IconWeb}
              _hover={{ color: '#005ed1' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
          </Link>
        </Tooltip>
      )}

      {etcDeployLink && (
        <Tooltip content={<Text>링크 이동</Text>}>
          <Link href={etcDeployLink} target="_blank" rel="noopener noreferrer">
            <Icon
              as={IconLink}
              _hover={{ color: 'logo' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
          </Link>
        </Tooltip>
      )}
    </Flex>
  );
}

export default PlatformDeployLink;

import { Text, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

type ToolTipProps = {
  content?: React.ReactNode;
  children: React.ReactNode;
};

const Container = styled(Box)`
  transition: 0.2s all ease;
  border-radius: 50%;
  height: 32px;

  #tooltip-content {
    visibility: hidden;
    position: absolute;
    background-color: #505050;
    width: max-content;
    transition: 0.2s all ease;
    left: 50%;
    top: -30px;
    padding: 4px 8px;
    color: #ffffff;
    border-radius: 5px;
    font-size: 14px;
    z-index: 10;
    transform: translateX(-50%) translateY(0px);
    opacity: 0;
  }

  :hover {
    background-color: #00000016;

    #tooltip-content {
      visibility: visible;
      transform: translateX(-50%) translateY(-5px);
      opacity: 1;
    }
  }
`;

export default function Tooltip({
  content,
  children,
}: ToolTipProps): JSX.Element {
  return (
    <Container position="relative">
      {children}
      <Box id="tooltip-content">
        <Text as="div">{content}</Text>
      </Box>
    </Container>
  );
}

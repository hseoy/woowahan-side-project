import { Box, Flex, FlexProps } from '@chakra-ui/react';

type ContentWrapperProps = {
  children: React.ReactNode;
  withPadding?: boolean;
} & FlexProps;

function ContentWrapper({
  children,
  withPadding,
  ...flexProps
}: ContentWrapperProps): JSX.Element {
  return (
    <Flex justifyContent="center" height="calc(100% - 70px)" {...flexProps}>
      <Box
        boxSizing="border-box"
        maxWidth="1200px"
        width="100%"
        margin="0 auto"
        padding={withPadding ? '25px 0' : undefined}
      >
        {children}
      </Box>
    </Flex>
  );
}

export default ContentWrapper;

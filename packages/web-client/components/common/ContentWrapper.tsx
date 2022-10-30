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
    <Flex
      justifyContent="center"
      height="calc(100% - 80px)"
      backgroundColor="#f1f2f5"
      style={{ margin: 0 }}
      {...flexProps}
    >
      <Box
        boxSizing="border-box"
        maxWidth="1320px"
        width="100%"
        margin="0 auto"
        padding={withPadding ? '20px 20px' : undefined}
      >
        {children}
      </Box>
    </Flex>
  );
}

export default ContentWrapper;

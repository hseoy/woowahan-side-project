import { Flex } from '@chakra-ui/react';

type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children = null }: HeaderProps): JSX.Element {
  return (
    <Flex
      width="100%"
      height="80px"
      minHeight="80px"
      padding="10px 30px"
      boxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.1)"
      justifyContent="space-between"
      alignItems="center"
      fontFamily="header"
    >
      {children}
    </Flex>
  );
}

export default Header;

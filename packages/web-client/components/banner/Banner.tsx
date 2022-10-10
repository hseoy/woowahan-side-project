import { Stack } from '@chakra-ui/react';

type BannerProps = {
  children: React.ReactNode;
};
function Banner({ children }: BannerProps): JSX.Element {
  return (
    <Stack
      width="280px"
      height="220px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="veryLightGray"
      position="relative"
      borderRadius="4px"
    >
      {children}
    </Stack>
  );
}

export default Banner;

import { Box, Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import IconScrollbarThumb from './IconScrollBarThumb';

type ScrollbarProps = {
  children: React.ReactNode;
  withWindowScroll?: boolean;
};

function Scrollbar({
  children,
  withWindowScroll,
}: ScrollbarProps): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex overflow="auto" position="relative" style={{ margin: 0 }}>
      <Box
        ref={scrollContainerRef}
        overflow="auto"
        width="100%"
        __css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'mint.300',
            borderRadius: '100px',
            transition: '0.5s',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'mint.500',
          },
          '&::-webkit-scrollbar-thumb:focus': {
            background: 'mint.500',
          },
        }}
      >
        {children}
      </Box>
      <IconScrollbarThumb
        size={30}
        scrollContainerRef={scrollContainerRef}
        withWindowScroll={withWindowScroll}
      />
    </Flex>
  );
}

export default Scrollbar;

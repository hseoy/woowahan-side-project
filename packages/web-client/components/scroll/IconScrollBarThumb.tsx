import { Icon, Stack } from '@chakra-ui/react';
import { RefObject, useEffect, useState } from 'react';
import useScroll from '@/hooks/use-scroll';
import BicycleToUp from '@/assets/svg/bicycle_to_up.svg';

type IconScrollbarThumbProps = {
  size?: number;
  scrollContainerRef: RefObject<HTMLDivElement>;
  withWindowScroll?: boolean;
};
function IconScrollbarThumb({
  size = 30,
  scrollContainerRef,
  withWindowScroll = false,
}: IconScrollbarThumbProps): JSX.Element {
  const thumbRight = 0;
  const [thumbTop, setThumbTop] = useState('0px');
  const [isThumbHidden, setIsThumbHidden] = useState(false);
  const { calculateScrollProgress, getScrollMoveDirection } = useScroll(
    scrollContainerRef,
    withWindowScroll,
  );

  const moveDirection = getScrollMoveDirection();

  const calculateIsThumbHidden = () => {
    const offsetHeight = scrollContainerRef.current?.offsetHeight || 0;
    const scrollHeight = scrollContainerRef.current?.scrollHeight || 0;
    setIsThumbHidden(offsetHeight >= scrollHeight);
  };

  const moveThumb = () => {
    const scrollProgress = calculateScrollProgress();
    const scrollProgressPercent = scrollProgress * 100;
    const offsetHeight = scrollContainerRef.current?.offsetHeight || 0;
    const isUnderflow = offsetHeight * scrollProgress - size < 0;
    const thumbPosStyle = isUnderflow
      ? '0px'
      : `calc(${scrollProgressPercent}% - ${size}px)`;

    setThumbTop(thumbPosStyle);
  };

  useEffect(() => {
    scrollContainerRef.current?.addEventListener('scroll', moveThumb);
    calculateIsThumbHidden();

    return () =>
      scrollContainerRef.current?.removeEventListener('scroll', moveThumb);
  }, [scrollContainerRef.current]);

  useEffect(() => {
    moveThumb();
    calculateIsThumbHidden();
  }, [
    scrollContainerRef,
    scrollContainerRef.current?.offsetHeight,
    scrollContainerRef?.current?.scrollHeight,
  ]);

  return (
    <Stack height="100%" hidden={isThumbHidden}>
      <Icon
        as={BicycleToUp}
        color="logo"
        position="absolute"
        right={`${thumbRight}px`}
        width={`${size}px`}
        height={`${size}px`}
        top={thumbTop}
        transition="top 0.3s, transform 0.1s"
        transform={moveDirection === 1 ? 'rotateX(180deg)' : 'rotateX(0deg)'}
      />
    </Stack>
  );
}

export default IconScrollbarThumb;

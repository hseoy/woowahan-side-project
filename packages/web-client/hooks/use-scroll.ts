import { useEffect, RefObject, useRef } from 'react';

const useScroll = (
  scrollContainerRef: RefObject<HTMLDivElement>,
  withWindowScroll: boolean,
) => {
  const lastScrollTopRef = useRef(0);
  const scrollMoveDirectionRef = useRef<1 | -1>(1);

  useEffect(() => {
    const scrollElementWhenWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || !withWindowScroll) return;
      scrollContainerRef.current.scrollBy({
        top: e.deltaY,
        left: 0,
      });
    };

    if (withWindowScroll) {
      document.addEventListener('wheel', scrollElementWhenWheel);
    }

    return () => document.removeEventListener('wheel', scrollElementWhenWheel);
  }, [scrollContainerRef.current, withWindowScroll]);

  const calculateScrollProgress = () => {
    if (!scrollContainerRef.current) return 0;

    const currentScrollPos = scrollContainerRef.current?.scrollTop || 0;
    const maxScrollHeight =
      (scrollContainerRef.current?.scrollHeight || 0) -
      (scrollContainerRef.current?.clientHeight || 0);
    return currentScrollPos / maxScrollHeight;
  };

  useEffect(() => {
    const detectingScrollbarMoveDirection = () => {
      if (!scrollContainerRef.current) return;

      const { scrollTop } = scrollContainerRef.current;

      scrollMoveDirectionRef.current =
        scrollTop > lastScrollTopRef.current ? 1 : -1;

      lastScrollTopRef.current = scrollTop;
    };

    scrollContainerRef.current?.addEventListener(
      'scroll',
      detectingScrollbarMoveDirection,
    );

    return () =>
      scrollContainerRef.current?.removeEventListener(
        'scroll',
        detectingScrollbarMoveDirection,
      );
  }, [scrollContainerRef.current]);

  const getScrollMoveDirection = () => scrollMoveDirectionRef.current;

  return {
    calculateScrollProgress,
    getScrollMoveDirection,
  };
};

export default useScroll;

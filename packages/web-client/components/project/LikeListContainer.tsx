import { Flex } from '@chakra-ui/react';
import LikeBlock from './LikeBlock';
import { LikeDto } from '@/apis/liks/dto';

type LikeListContainerProps = {
  likeList: LikeDto[];
};
export default function LikeListContainer({
  likeList,
}: LikeListContainerProps): JSX.Element {
  // 현재 좋아요 눌린 애들만 표기
  return (
    <Flex
      position="absolute"
      // background="linear-gradient( rgba(75,75,75,60),rgba(0,0,0,0));"
      height="fit-content"
      width="100%"
      padding="20px"
      gap="4px"
      alignItems="center"
    >
      {likeList?.map(item => (
        <LikeBlock key={item.id} {...item} />
      ))}
    </Flex>
  );
}

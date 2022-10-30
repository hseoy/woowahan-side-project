import { Flex } from '@chakra-ui/react';
import LikeBlock from './LikeBlock';
import { LikeDto } from '@/apis/liks/dto';

type LikeListContainerProps = {
  likeList: LikeDto[];
};
export default function LikeListContainer({
  likeList,
}: LikeListContainerProps): JSX.Element {
  return (
    <Flex
      position="absolute"
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

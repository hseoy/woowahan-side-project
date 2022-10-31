import { Flex } from '@chakra-ui/react';
import LikeBlock from './LikeBlock';
import { LikeDto, LikeEnum } from '@/apis/likes/dto';

type LikeListContainerProps = {
  likeList: LikeDto[];
};
export default function LikeListContainer({
  likeList,
}: LikeListContainerProps): JSX.Element {
  const convertedLikeObj = likeList.reduce(
    (acc, cur) => ({ ...acc, [cur.like]: cur }),
    {} as Record<LikeEnum, LikeDto>,
  );

  return (
    <Flex
      position="absolute"
      height="fit-content"
      width="fit-content"
      borderRadius="10px"
      padding="10px"
      gap="10px"
      alignItems="center"
      marginTop="9px"
      marginLeft="9px"
    >
      {convertedLikeObj.예뻐요 && <LikeBlock {...convertedLikeObj.예뻐요} />}
      {convertedLikeObj.필요했어요 && (
        <LikeBlock {...convertedLikeObj.필요했어요} />
      )}
      {convertedLikeObj.느낌있어요 && (
        <LikeBlock {...convertedLikeObj.느낌있어요} />
      )}
      {convertedLikeObj.창업하세요 && (
        <LikeBlock {...convertedLikeObj.창업하세요} />
      )}
      {convertedLikeObj.공유하고싶어요 && (
        <LikeBlock {...convertedLikeObj.공유하고싶어요} />
      )}
      {convertedLikeObj.좋아요 && <LikeBlock {...convertedLikeObj.좋아요} />}
    </Flex>
  );
}

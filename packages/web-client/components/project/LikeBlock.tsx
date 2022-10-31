import { Icon } from '@chakra-ui/react';
import IconBeauty from '@/assets/svg/fluent-emoji_smiling-face-with-hearts.svg';
import IconFeel from '@/assets/svg/fluent-emoji_smiling-face-with-sunglasses.svg';
import IconLike from '@/assets/svg/fluent-emoji_smiling-face-with-heart-eyes.svg';
import IconNeed from '@/assets/svg/fluent-emoji_face-holding-back-tears.svg';
import IconShare from '@/assets/svg/fluent-emoji_hugging-face.svg';
import IconStartUp from '@/assets/svg/fluent-emoji_money-mouth-face.svg';
import { LikeDto } from '@/apis/liks/dto';

export const IconMapper = {
  예뻐요: IconBeauty,
  필요했어요: IconNeed,
  느낌있어요: IconFeel,
  창업하세요: IconStartUp,
  공유하고싶어요: IconShare,
  좋아요: IconLike,
};

export default function LikeBlock({ like }: LikeDto): JSX.Element {
  return (
    <Icon as={IconMapper[like]} borderRadius="50%" width="32px" height="32px" />
  );
}

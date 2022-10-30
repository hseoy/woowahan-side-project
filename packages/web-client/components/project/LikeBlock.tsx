import { Icon } from '@chakra-ui/react';
import IconBeauty from '@/assets/svg/icon_beauty.svg';
import IconFeel from '@/assets/svg/icon_feel.svg';
import IconLike from '@/assets/svg/icon_like.svg';
import IconNeed from '@/assets/svg/icon_need.svg';
import IconShare from '@/assets/svg/icon_share.svg';
import IconStartUp from '@/assets/svg/icon_startup.svg';
import { LikeDto } from '@/apis/liks/dto';

export default function LikeBlock({ like }: LikeDto): JSX.Element {
  const IconMapper = {
    예뻐요: IconBeauty,
    필요했어요: IconNeed,
    느낌있어요: IconFeel,
    창업하세요: IconStartUp,
    공유하고싶어요: IconShare,
    좋아요: IconLike,
  };

  const IconColorMapper = {
    예뻐요: '#f67cff',
    필요했어요: '#ffa83f',
    느낌있어요: '#f5d028',
    창업하세요: '#5b50ff',
    공유하고싶어요: '#a3f84f',
    좋아요: '#fb7575',
  };

  return (
    <Icon
      as={IconMapper[like]}
      color={IconColorMapper[like]}
      borderRadius="50%"
      backdropFilter="blur(10px)"
      backgroundColor="#ffffff14"
      width="32px"
      height="32px"
    />
  );
}

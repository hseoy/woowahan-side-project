import dayjs, { Dayjs } from 'dayjs';

export const diffDate = (date1: Dayjs, date2: Dayjs) => {
  let dateBig = date1.locale('ko');
  let dateSmall = date2.locale('ko');

  if (dateBig.isBefore(dateSmall)) {
    dateBig = date2;
    dateSmall = date1;
  }

  return {
    year: dateBig.get('year') - dateSmall.get('year'),
    month: dateBig.get('month') - dateSmall.get('month'),
    day: dateBig.get('day') - dateSmall.get('day'),
    hour: dateBig.get('hour') - dateSmall.get('hour'), // 한국 시간을 기준으로 하기 위해 9시간 더함.
    minutes: dateBig.get('minutes') - dateSmall.get('minutes'),
    seconds: dateBig.get('seconds') - dateSmall.get('seconds'),
  };
};

export const timeUnits = ['년', '달', '일', '시간', '분', '초'];

export const getTimeSince = (date: string) => {
  const nowDate = dayjs();
  const diffDateInfo = diffDate(nowDate, dayjs(date));

  const timeSince = Object.values(diffDateInfo)
    .map((value, i) => ({ value, i }))
    .filter(time => time.value > 0)[0];

  if (!timeSince) return '방금';
  return `${timeSince.value}${timeUnits[timeSince.i]} 전`;
};

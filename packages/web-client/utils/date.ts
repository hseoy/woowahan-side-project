export const diffDate = (date1: Date, date2: Date) => {
  let dateBig = date1;
  let dateSmall = date2;

  if (dateSmall.getTime() - dateBig.getTime() > 0) {
    dateBig = date2;
    dateSmall = date1;
  }

  return {
    year: dateBig.getFullYear() - dateSmall.getFullYear(),
    month: dateBig.getMonth() - dateSmall.getMonth(),
    day: dateBig.getDate() - dateSmall.getDate(),
    hour: dateBig.getHours() - dateSmall.getHours(),
    minutes: dateBig.getMinutes() - dateSmall.getMinutes(),
    seconds: dateBig.getSeconds() - dateSmall.getSeconds(),
  };
};

export const timeUnits = ['년', '달', '일', '시간', '분', '초'];

export const getTimeSince = (date: string) => {
  const nowDate = new Date();
  const diffDateInfo = diffDate(nowDate, new Date(date));

  const timeSince = Object.values(diffDateInfo)
    .map((value, i) => ({ value, i }))
    .filter(time => time.value > 0)[0];

  if (!timeSince) return '방금';
  return `${timeSince.value}${timeUnits[timeSince.i]} 전`;
};

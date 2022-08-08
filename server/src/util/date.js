export const padZero = (num) => num.toString().padStart(2, '0');
export const getTodayDateString = (option = { withHyphen: true }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const result = option.withHyphen
    ? `${year}-${padZero(month)}-${padZero(date)}`
    : `${year}${padZero(month)}${padZero(date)}`;
  return result;
};

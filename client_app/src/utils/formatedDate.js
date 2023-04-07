export const formatedDate = (time) => {
  const day = new Date(time);
  return `Ngày ${day.getDay()}/${day.getMonth()}/${day.getFullYear()}`;
};

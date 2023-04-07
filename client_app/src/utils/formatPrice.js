export const formatPrice = (number) => {
  const formattedString = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedString;
};

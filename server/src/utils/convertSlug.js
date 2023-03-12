const unorm = require("unorm");
const convertSlug = (vietnameseString) => {
  const normalizedString = unorm
    .nfd(vietnameseString)
    .replace(/[\u0300-\u036f]/g, "");

  return normalizedString;
};

module.exports = convertSlug;

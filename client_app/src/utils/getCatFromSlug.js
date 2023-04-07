export const getCatFromSlug = (object, query) => {
  let result = null;

  for (let key in object) {
    if (object[key].slug === query) {
      result = object[key];
      break;
    }
  }
  return result;
};

export const findItemsBySlug = (object, query) => {
  let parent = getCatFromSlug(object, query);
  const result = [];
  if (parent && parent._id) {
    for (let key in object) {
      if (object[key].parentId === parent._id) {
        result.push(object[key]);
      }
    }
  }
  return result;
};

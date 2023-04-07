export const createListCategory = (inputObject) => {
  const outputArray = [];

  // Create a dictionary to hold references to each object by their id
  const objectDictionary = {};
  for (const id in inputObject) {
    objectDictionary[id] = { ...inputObject[id], children: [] };
  }

  // Traverse the dictionary and add each object to its parent's children array
  for (const id in objectDictionary) {
    const object = objectDictionary[id];
    const parentId = object.parentId;
    if (parentId !== undefined) {
      const parent = objectDictionary[parentId];

      if (parent !== undefined) {
        parent.children.push({ ...object, parentSlug: parent.slug });
      }
    } else {
      outputArray.push(object);
    }
  }
  return outputArray;
};

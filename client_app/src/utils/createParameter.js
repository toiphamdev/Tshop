export const createParameter = (brand, price = {}, sort = {}, type) => {
  let query = "";
  let parameter = "";

  if (brand && brand.length === 1) {
    query = "/" + brand[0].value;
  } else if (brand && brand.length > 1) {
    parameter = "?hang-san-xuat=";
    for (let i = 0; i < brand.length; i++) {
      parameter += brand[i].value;
      if (i < brand.length - 1) {
        parameter += ",";
      }
    }
  }
  if (Object.keys(sort).length > 0) {
    parameter += parameter ? "&" : "?";
    parameter += "sort=" + sort.value;
  }

  if (Object.keys(price).length > 0) {
    parameter += parameter ? "&" : "?";
    parameter += "muc-gia=" + price.value;
  }

  return query + parameter;
};

export const getServerQuery = (
  type = "",
  category = "",
  queryBrand = "",
  queryPrice = {},
  querySort = {}
) => {
  let query = `type=${type}`;
  if (category) {
    query += "&category=" + category;
  }
  if (queryBrand) {
    const arr = queryBrand.split(",");
    for (let i = 0; i < arr.length; i++) {
      query += "&category=" + arr[i];
    }
  }
  if (Object.keys(queryPrice).length > 0) {
    query += "&" + queryPrice.slug;
  }
  if (Object.keys(querySort).length > 0) {
    query += "&sort=" + querySort.slug;
  }
  return query;
};

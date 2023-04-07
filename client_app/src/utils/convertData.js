export const convertDataRating = (data) => {
  const result = {
    1: { count: 0 },
    2: { count: 0 },
    3: { count: 0 },
    4: { count: 0 },
    5: { count: 0 },
  };

  data.forEach((obj) => {
    const star = obj.star;
    result[star].count++;
  });

  return result;
};

export const genarateStarArr = (num) => {
  let starArr = [];
  for (let i = 1; i <= 5; i++) {
    starArr.push({
      stt: i,
      hasStar: i > num ? false : true,
    });
  }
  return starArr;
};

export const convertDataSelectFromCat = (items) => {
  const result = [];
  for (let item of items) {
    result.push({
      label: item.title,
      value: item.slug,
    });
  }
  return result;
};

export const getSelectedDataFormValue = (arr = [], value) => {
  let result = {};
  const resultArr = arr.filter((item) => item.value === value);
  result = resultArr[0];
  return result;
};

export const convertSelectedDataCat = (arr = [], slug) => {
  let result = {};
  let resultArr = arr.filter((cat) => {
    return cat.value === slug;
  });
  result = resultArr[0] ? resultArr[0] : {};
  return result;
};

export const convertCartToArr = (cart) => {
  let cartArray = []; // tạo mảng rỗng để lưu giỏ hàng chuyển đổi

  // lặp qua từng cặp key-value của giỏ hàng đối tượng
  for (let key in cart) {
    // tạo một đối tượng mới từ giá trị của giỏ hàng
    let product = {
      _id: cart[key]._id,
      count: cart[key].count,
    };
    // thêm đối tượng mới vào mảng giỏ hàng chuyển đổi
    cartArray.push(product);
  }

  // in ra kết quả mảng giỏ hàng chuyển đổi
  return cartArray;
};

export const sortArr = [
  { label: "Bán chạy nhất", value: "ban-chay-nhat", slug: "-sold" },
  { label: "Giá cao", value: "gia-cao", slug: "-price" },
  { label: "Giá thấp", value: "gia-thap", slug: "price" },
];

export const priceFilterArr = [
  { label: "Dưới 10 triệu", value: "10-trieu", slug: "price[lt]=10000000" },
  {
    label: "Từ 10-15 triệu",
    value: "tu-10-15-trieu",
    slug: "price[gte]=10000000&price[lt]=15000000",
  },
  {
    label: "Từ 15-20 triệu",
    value: "tu-15-20-trieu",
    slug: "price[gte]=15000000&price[lt]=20000000",
  },
  {
    label: "Trên 20 triệu",
    value: "tren-20-trieu",
    slug: "price[gte]=20000000",
  },
];

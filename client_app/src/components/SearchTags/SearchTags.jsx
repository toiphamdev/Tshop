import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { getAllProductService } from "../../services/productService";
import ItemTagHint from "./ItemTagHint";
import "./searchtag.css";

const SearchTags = ({ value, tag, onChange }) => {
  const [searchText, setSearchText] = useState(value);
  const [searchHints, setSearchHints] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  useEffect(() => {
    const query = searchText.trim().toLowerCase();
    async function fetchHints() {
      const res = await getAllProductService(`q=${query}`, 1, 5);
      const hints = await res.data.products;
      setSearchHints(hints);
    }
    if (query) {
      fetchHints();
    }
  }, [searchText]);
  const handleChange = (event) => {
    clearTimeout(timeoutId);

    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    const newTimeoutId = setTimeout(() => {
      setSearchText(newSearchText);
    }, 3000);

    setTimeoutId(newTimeoutId);
  };
  return (
    <div>
      <div className="search__tag-wrapper d-flex align-items-center">
        <BsSearch size={"18px"} />
        <input
          className="search__tag-input"
          value={searchText}
          onChange={handleChange}
          placeholder="Nhập sản phẩm cần tìm"
        />
        <ul className="search__tag-hint p-0">
          {searchHints.map((hint, index) => (
            <li
              key={index}
              onMouseDown={() => {
                onChange(hint, tag);
                setSearchText(hint.title);
              }}
              className="d-flex item__tag-hint"
            >
              <ItemTagHint imgUrl={hint.images[0]} title={hint.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchTags;

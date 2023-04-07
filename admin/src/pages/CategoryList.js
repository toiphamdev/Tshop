import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/categorySlice";
import { createTreeCategory } from "../utils/formatedData";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (checkedKeys, info) => {
    const { checked, checkedNodes, node } = info;
    // If a parent node is checked, also check all of its children
    if (node && node.children) {
      const childKeys = node.children.map((child) => child.key);
      if (checked) {
        setCheckedKeys([...checkedKeys.checked, ...childKeys]);
      } else {
        // If all child nodes are unchecked, uncheck the parent node
        const allUnchecked = checkedNodes.every(
          (n) => !n.key.startsWith(node.key)
        );
        setCheckedKeys(
          allUnchecked
            ? checkedKeys.checked.filter((key) => !childKeys.includes(key))
            : [...checkedKeys.checked]
        );
      }
    } else {
      // If a child node is checked or unchecked, update the checked keys
      setCheckedKeys(checkedKeys);
    }
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <h3 className="mb-4">Category List</h3>
      <Tree
        treeData={createTreeCategory(categories)}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        checkStrictly={true}
        checkable
      />
    </div>
  );
};

export default CategoryList;

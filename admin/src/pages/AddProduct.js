import React from "react";
import CustomInput from "../components/CustomInput";

const AddProduct = () => {
  return (
    <div>
      <h3>Add Product</h3>
      <div>
        <form>
          <CustomInput type={"text"} label={"Enter product name"} />
          <CustomInput type={"text"} label={"Enter product name"} />
          <button
            type="submit"
            className="btn btn-success border-0 rouded-3 my-5"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

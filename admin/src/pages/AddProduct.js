import React from "react";
import CustomInput from "../components/CustomInput";

const AddProduct = () => {
  return (
    <div>
      <h3>Add Product</h3>
      <div>
        <form>
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

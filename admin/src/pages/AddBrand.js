import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3>Add Brand</h3>
      <div>
        <form>
          <CustomInput type={"text"} label={"Enter Blog Categories"} />
          <button
            type="submit"
            className="btn btn-success border-0 rouded-3 my-5"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;

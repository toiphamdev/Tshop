import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCat = () => {
  return (
    <div>
      <h3>Add Blog Category</h3>
      <div>
        <form>
          <CustomInput type={"text"} label={"Enter Blog Categories"} />
          <button
            type="submit"
            className="btn btn-success border-0 rouded-3 my-5"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;

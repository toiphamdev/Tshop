import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogCat,
  getABlogCat,
  resetState,
  updateBlogCat,
} from "../features/blogCategory/blogCatSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select } from "antd";
import { buildDataSelect } from "../utils/formatedData";
import { getCategories } from "../features/category/categorySlice";
const AddCat = () => {
  const { id } = useParams();
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const { message, isSuccess, isError, isLoading, catName, parentId } =
    useSelector((state) => state.category);
  const formik = useFormik({
    initialValues: {
      title: "",
      parentId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      parentId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (id) {
        //update blog category by id
        const data = { id, title: values.title };
        dispatch(updateBlogCat(data));
        setFlag(true);
      } else {
        //create a new category
        dispatch(createBlogCat({ title: values.title }));
        setFlag(true);
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };
  useEffect(() => {
    if (isSuccess && flag && !isLoading) {
      toast.success(message);
    }
    if (isError && flag && !isLoading) {
      toast.error(message);
    }
    if (isLoading) {
      toast.info("Loading...");
    }
  }, [message, isError, isSuccess]);
  useEffect(() => {
    if (id) {
      dispatch(getABlogCat(id));
    }
  }, []);
  useEffect(() => {
    formik.setValues({ ...formik.values, title: catName, parentId: parentId });
  }, [catName]);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div>
      <h3>Add Blog Category</h3>
      <div>
        <form>
          <CustomInput
            value={formik.values.title}
            onChange={formik.handleChange}
            type={"text"}
            label="Title"
            i_id="title"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
          <Select
            showSearch
            style={{ width: 160 }}
            placeholder="Select blog category"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            // defaultValue={enq.status}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={buildDataSelect(
              Object.keys(categories).map((key) => {
                return categories[key];
              })
            )}
          />

          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-success border-0 rouded-3 my-5"
          >
            {id ? "Save change" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;

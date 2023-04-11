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
const AddBlogCat = () => {
  const { id } = useParams();
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const { message, isSuccess, isError, isLoading, blogCatName } = useSelector(
    (state) => state.blogCategory
  );
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (id) {
        //update blog category by id
        const data = { id, title: values.title };
        dispatch(updateBlogCat(data));

        setFlag(true);
      } else {
        //create a new category
        dispatch(createBlogCat(values.title));
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
    formik.setValues({ ...formik.values, title: blogCatName });
  }, [blogCatName]);
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

          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-success border-0 rouded-3 my-5"
          >
            {id ? "Save change" : "Add Blog Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;

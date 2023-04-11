import React, { useEffect, useState } from "react";
import EditorMarkdown from "../components/EditorMarkdown";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { Select } from "antd";
import { buildDataSelect } from "../utils/formatedData";
import { getBlogCats } from "../features/blogCategory/blogCatSlice";

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const imgState = useSelector((state) => state.upload.images);
  const dispatch = useDispatch();
  const handleEditorChange = ({ html }) => {
    console.log("handleEditorChange", html);
    // Do something...
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  useEffect(() => {
    dispatch(getBlogCats());
  }, []);
  return (
    <div>
      <h3>Add Blog</h3>
      <div>
        <div className="bg-white border-1 p-5 text-center">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimages d-flex flex-wrap gap-3">
          {imgState?.map((i, j) => {
            return (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            );
          })}
        </div>
        <div className="my-3">
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
            options={buildDataSelect(blogCategories)}
          />
        </div>
        <div className="my-5">
          <EditorMarkdown
            setEditorHtml={handleEditorChange}
            editorHtml={desc}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBlog;

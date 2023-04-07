import React, { useEffect, useState } from "react";
import "./tagbar.css";

const TagBar = ({ tags }) => {
  const [selectedTag, setSelectedTag] = useState({});
  const tagRef = React.useRef(null);
  window.onload = function (x) {
    // Code here will only run once the entire page (including images and other resources) has loaded
    const tagBar = tagRef.current;
    tagBar.scrollTo({
      left: x,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   function handleScroll() {
  //     for (const tag of tags) {
  //       const section = tag.ref.current.getBoundingClientRect();
  //       if (section.top <= section.height) {
  //         const tagElement = document.getElementById(`tag-${tag.id}`);
  //         if (tagElement) {
  //           const tagRect = tagElement.getBoundingClientRect();
  //           const tagBar = tagElement.parentNode;
  //           const tagBarRect = tagBar.getBoundingClientRect();
  //           const scrollX = tagRect.left + tagBar.scrollLeft - tagBarRect.left;
  //           window.onload(scrollX);
  //         }
  //         setSelectedTag(tag);
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const handleTagClick = (tag) => {
    // Handle tag click event

    const tagElement = document.getElementById(`tag-${tag.id}`);
    if (tagElement) {
      const tagRect = tagElement.getBoundingClientRect();
      const tagBar = tagElement.parentNode;
      const tagBarRect = tagBar.getBoundingClientRect();
      const scrollX = tagRect.left + tagBar.scrollLeft - tagBarRect.left;
      window.onload(scrollX);
    }
    tag.ref.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    if (tagRef.current) {
      tagRef.current.scrollLeft = 0;
    }
  }, [tags]);

  return (
    <div className="tag-bar-container">
      <div className="tag-bar" ref={tagRef}>
        {tags.map((tag, index) => (
          <div
            key={index}
            id={`tag-${tag.id}`}
            className={"tag"}
            onClick={() => handleTagClick(tag)}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagBar;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getProductCommentService } from "../../services/productService";
import Paginate from "../Paginate/Paginate";
import Comment from "./Comment";

const CommentWrapper = ({ flagRating }) => {
  const [commentArr, setCommentArr] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const currentProd = useSelector((state) => state.product.productDetails);
  const [productId, setProductId] = useState("");
  const commentRef = useRef();

  useEffect(() => {
    if (productId) {
      getComment();
    }
  }, [productId, activePage, flagRating]);
  useEffect(() => {
    setProductId(currentProd._id);
  }, [currentProd]);
  const handleSetActivePage = (page) => {
    setActivePage(page);
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const getComment = async () => {
    const res = await getProductCommentService(productId, activePage, 2);

    if (res && res.status === 200) {
      const { ratings, pageCount } = res.data;
      if (ratings) {
        setCommentArr([...ratings]);
      } else {
        setCommentArr([]);
      }
      setTotalPage(pageCount);
    }
  };
  return (
    <div ref={commentRef} className="product__comment py-3">
      <div className="product__comment-content">
        {commentArr.length > 0 &&
          commentArr.map((item, index) => {
            return (
              <Comment
                key={index}
                star={item.star}
                comment={item.comment}
                user={item.user}
                updatedAt={item.updatedAt}
              />
            );
          })}
      </div>
      {totalPage > 1 && (
        <div className="product__comment-paginate">
          <Paginate
            totalItems={totalPage}
            activePage={activePage}
            onSelectPage={handleSetActivePage}
          />
        </div>
      )}
      {commentArr.length === 0 && (
        <div className="text-center">
          <span className=" text-danger">Chưa có đánh giá...</span>
        </div>
      )}
    </div>
  );
};

export default CommentWrapper;

import React from "react";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { formatedDate, genarateStarArr } from "../../utils";
import "./comment.css";

const Comment = ({ star, comment, user, updatedAt }) => {
  return (
    <div className="d-flex w-100">
      <span className="comment__avatar">
        {user && `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}
      </span>
      <div className="w-100 ps-3">
        <h6>{user && `${user.firstname} ${user.lastname}`}</h6>
        <div className="star d-flex pb-3">
          {genarateStarArr(star).map((item) => {
            return (
              <div className="star__icon" key={item.stt}>
                {item.hasStar ? (
                  <BsFillStarFill color="#ea9d02" />
                ) : (
                  <BsStar color="#ea9d02" />
                )}
              </div>
            );
          })}
        </div>
        <span className="comment__content">{comment}</span>
        <div className="comment__time text-end">
          <span className="text-muted">{formatedDate(updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;

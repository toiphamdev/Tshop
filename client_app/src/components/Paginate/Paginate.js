import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import "./paginate.css";

const Paginate = ({
  totalItems = 2,
  itemsPerPage = 1,
  activePage,
  onSelectPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Tính toán danh sách trang cần hiển thị
  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (activePage <= 3) {
    pageNumbers.push(1, 2, 3, 4, "...", totalPages);
  } else if (activePage >= totalPages - 2) {
    pageNumbers.push(
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pageNumbers.push(
      1,
      "...",
      activePage - 1,
      activePage,
      activePage + 1,
      "...",
      totalPages
    );
  }

  return (
    <Pagination>
      {activePage > 1 && (
        <Pagination.Prev onClick={() => onSelectPage(activePage - 1)} />
      )}
      {pageNumbers.map((pageNumber, index) => (
        <Pagination.Item
          key={index}
          active={pageNumber === activePage}
          onClick={() => {
            if (pageNumber !== "...") {
              onSelectPage(pageNumber);
            }
          }}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      {activePage < totalPages && (
        <Pagination.Next onClick={() => onSelectPage(activePage + 1)} />
      )}
    </Pagination>
  );
};

export default Paginate;

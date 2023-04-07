const ItemTagHint = ({ imgUrl, title }) => {
  return (
    <>
      <img src={imgUrl ? imgUrl.url : ""} />
      <p>{title}</p>
    </>
  );
};

export default ItemTagHint;

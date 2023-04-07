import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";

const dataRatingStar = {
  1: { active: false },
  2: { active: false },
  3: { active: false },
  4: { active: false },
  5: { active: false },
};

const RatingStar = ({ setStar }) => {
  const [ratingStar, setRatingStar] = useState(dataRatingStar);

  const handleHover = (key) => {
    const updatedRatingStar = { ...ratingStar };
    for (let i = 1; i <= 5; i++) {
      if (i <= key) {
        updatedRatingStar[i].active = true;
      } else {
        updatedRatingStar[i].active = false;
      }
    }
    setRatingStar(updatedRatingStar);
  };

  useEffect(() => {
    handleExportStar();
  }, [ratingStar]);
  const handleExportStar = () => {
    const activeKeys = Object.keys(dataRatingStar).filter(
      (key) => dataRatingStar[key].active
    );

    const numActiveKeys = activeKeys.length;
    setStar(numActiveKeys);
  };

  return (
    <div>
      {Object.keys(ratingStar).map((key) => (
        <span
          className="px-2"
          key={key}
          onMouseEnter={() => handleHover(key)}
          onMouseLeave={() => setRatingStar(dataRatingStar)}
        >
          {ratingStar[key].active ? (
            <BsStarFill color="#ea9d02" size="24px" />
          ) : (
            <BsStarFill color="#99a2b8" size={"24px"} />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingStar;

import React, { useState } from "react";

const RatingStars = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleRating = (rate) => {
    setRating(rate);
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none"
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          >
            <span
              className={`material-symbols-outlined text-4xl ${
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              star
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;

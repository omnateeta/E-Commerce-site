import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
        star <= rating
          ? "text-yellow-500 hover:bg-yellow-50"
          : "text-gray-300 hover:bg-gray-100"
      }`}
      variant="ghost"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 transition-all duration-200 ${
          star <= rating ? "fill-yellow-500" : "fill-gray-200"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;

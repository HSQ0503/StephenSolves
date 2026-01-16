import DynamicIcon from "@/helpers/DynamicIcon";

interface Props {
  rating: number | undefined;
  color?: string;
}

export default function StarRatings({ rating, color = "text-lime-400" }: Props) {
  const safeRating =
    typeof rating === "number" && !isNaN(rating)
      ? Math.max(0, Math.min(5, rating))
      : 0;

  const roundedRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const starTypes = [
    ...Array(fullStars).fill("FaStar"),
    ...(hasHalfStar ? ["FaRegStarHalfStroke"] : []),
    ...Array(emptyStars).fill("FaRegStar"),
  ];

  return (
    <div className="flex justify-start gap-x-1">
      {starTypes.map((starType, i) => (
        <DynamicIcon
          key={i}
          icon={starType}
          className={`text-lg ${color}`}
        />
      ))}
    </div>
  );
}

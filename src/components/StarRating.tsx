interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  reviewCount?: number;
}

function StarRating({
  rating = 0,
  maxStars = 5,
  reviewCount = 0,
}: StarRatingProps) {
  const validRating = Math.min(Math.max(rating || 0, 0), maxStars);

  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starValue = index + 1;
    const isHalfStar = validRating > starValue - 1 && validRating < starValue;
    const isFullStar = validRating >= starValue;

    return (
      <span key={index} className="inline-block relative">
        <svg
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
          stroke="currentColor"
          viewBox="-1 -1 20 20"
        >
          <path d="M8.53834 0.609964C8.70914 0.199318 9.29086 0.199318 9.46166 0.609964L11.5278 5.57744C11.5998 5.75056 11.7626 5.86885 11.9495 5.88383L17.3123 6.31376C17.7556 6.3493 17.9354 6.90256 17.5976 7.19189L13.5117 10.6919C13.3693 10.8139 13.3071 11.0053 13.3506 11.1876L14.5989 16.4208C14.7021 16.8534 14.2315 17.1954 13.8519 16.9635L9.26063 14.1592C9.10062 14.0615 8.89938 14.0615 8.73937 14.1592L4.14806 16.9635C3.76851 17.1954 3.29788 16.8534 3.40108 16.4208L4.64939 11.1876C4.69289 11.0053 4.6307 10.8139 4.48831 10.6919L0.402413 7.19189C0.0646446 6.90256 0.244408 6.3493 0.687735 6.31376L6.05054 5.88383C6.23744 5.86885 6.40024 5.75056 6.47225 5.57744L8.53834 0.609964Z" />
        </svg>

        {isFullStar && (
          <svg
            className="w-5 h-5 text-yellow-400 absolute top-0 left-0"
            fill="currentColor"
            stroke="currentColor"
            viewBox="-1 -1 20 20"
          >
            <path d="M8.53834 0.609964C8.70914 0.199318 9.29086 0.199318 9.46166 0.609964L11.5278 5.57744C11.5998 5.75056 11.7626 5.86885 11.9495 5.88383L17.3123 6.31376C17.7556 6.3493 17.9354 6.90256 17.5976 7.19189L13.5117 10.6919C13.3693 10.8139 13.3071 11.0053 13.3506 11.1876L14.5989 16.4208C14.7021 16.8534 14.2315 17.1954 13.8519 16.9635L9.26063 14.1592C9.10062 14.0615 8.89938 14.0615 8.73937 14.1592L4.14806 16.9635C3.76851 17.1954 3.29788 16.8534 3.40108 16.4208L4.64939 11.1876C4.69289 11.0053 4.6307 10.8139 4.48831 10.6919L0.402413 7.19189C0.0646446 6.90256 0.244408 6.3493 0.687735 6.31376L6.05054 5.88383C6.23744 5.86885 6.40024 5.75056 6.47225 5.57744L8.53834 0.609964Z" />
          </svg>
        )}

        {isHalfStar && (
          <svg
            className="w-5 h-5 text-yellow-400 absolute top-0 left-0"
            fill="currentColor"
            stroke="currentColor"
            viewBox="-1 -1 20 20"
            style={{ clipPath: "inset(0 56% 0 0)" }}
          >
            <path d="M8.53834 0.609964C8.70914 0.199318 9.29086 0.199318 9.46166 0.609964L11.5278 5.57744C11.5998 5.75056 11.7626 5.86885 11.9495 5.88383L17.3123 6.31376C17.7556 6.3493 17.9354 6.90256 17.5976 7.19189L13.5117 10.6919C13.3693 10.8139 13.3071 11.0053 13.3506 11.1876L14.5989 16.4208C14.7021 16.8534 14.2315 17.1954 13.8519 16.9635L9.26063 14.1592C9.10062 14.0615 8.89938 14.0615 8.73937 14.1592L4.14806 16.9635C3.76851 17.1954 3.29788 16.8534 3.40108 16.4208L4.64939 11.1876C4.69289 11.0053 4.6307 10.8139 4.48831 10.6919L0.402413 7.19189C0.0646446 6.90256 0.244408 6.3493 0.687735 6.31376L6.05054 5.88383C6.23744 5.86885 6.40024 5.75056 6.47225 5.57744L8.53834 0.609964Z" />
          </svg>
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-[8px] pt-[16px] pb-[32px]">
      <span className="text-xl text-neutral-900">{validRating.toFixed(1)}</span>
      <div className="flex gap-[4px]">{stars}</div>
      {reviewCount > 0 && (
        <span className="font-medium text-sm text-indigo-700">
          See all {reviewCount} reviews
        </span>
      )}
    </div>
  );
}

export default StarRating;

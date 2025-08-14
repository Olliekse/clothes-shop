import StarRating from "../../components/StarRating";
import { dataService } from "../../api/dataService";
import { capitalizeWords, formatDate } from "../../lib/stringUtils";
import { useEffect, useState } from "react";

interface ReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
  setReviewsShow: Function;
}

function Reviews({
  productId,
  rating,
  reviewCount,
  setReviewsShow,
}: ReviewsProps) {
  const productReviews = dataService.getProductReviews(productId);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  const excellentReviews = productReviews.filter(
    (review) => review.rating === 5
  ).length;
  const goodReviews = productReviews.filter(
    (review) => review.rating === 4
  ).length;
  const averageReviews = productReviews.filter(
    (review) => review.rating === 3
  ).length;
  const belowAverageReviews = productReviews.filter(
    (review) => review.rating === 2
  ).length;
  const poorReviews = productReviews.filter(
    (review) => review.rating <= 1
  ).length;

  const totalReviews = productReviews.length;

  const reviewData = [
    { category: "Excellent", count: excellentReviews, rating: 5 },
    { category: "Good", count: goodReviews, rating: 4 },
    { category: "Average", count: averageReviews, rating: 3 },
    { category: "Below Average", count: belowAverageReviews, rating: 2 },
    { category: "Poor", count: poorReviews, rating: 1 },
  ];

  const getReviewStats = (count: number) => {
    const percentage =
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { percentage };
  };

  const handleMoreReviews = () => {
    setResultsPerPage((prev) => prev + 12);
  };

  const handleFilterClick = (rating: number) => {
    if (activeFilter === rating) {
      setActiveFilter(null);
    } else {
      setActiveFilter(rating);
    }

    setResultsPerPage(12);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setResultsPerPage(12);
  };

  const getFilteredReviews = () => {
    let filtered = productReviews.filter(
      (productReview) => productReview.product_id === productId
    );

    if (activeFilter !== null) {
      filtered = filtered.filter((review) => review.rating === activeFilter);
    }

    return filtered;
  };

  const filteredReviews = getFilteredReviews();
  const hasMoreReviews = resultsPerPage < filteredReviews.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/80 flex items-center justify-center lg:p-4 px-4 py-20">
      <div className="bg-white rounded-lg shadow-xl lg:w-[1040px] lg:h-[608px] w-[343px] md:w-[522px] max-h-[80vh] flex flex-col relative">
        <div
          className="absolute top-6 right-6 cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1"
          onClick={() => setReviewsShow(false)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setReviewsShow(false);
            }
          }}
          role="button"
          aria-label="Close reviews"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.0007 5.5865L11.9504 0.636719L13.3646 2.05093L8.4149 7.0007L13.3646 11.9504L11.9504 13.3646L7.0007 8.4149L2.05093 13.3646L0.636719 11.9504L5.5865 7.0007L0.636719 2.05093L2.05093 0.636719L7.0007 5.5865Z"
              fill="#171717"
            />
          </svg>
        </div>
        <div className="flex flex-col pl-4 pr-3 lg:px-8 pt-[72px] lg:pb-4 lg:flex-row flex-1 overflow-y-auto lg:overflow-y-hidden lg:justify-between">
          <div className="flex-shrink-0 w-full lg:w-[320px] pl-2">
            <h1 className="font-semibold text-xl text-neutral-900">
              Overall Rating
            </h1>
            <StarRating
              rating={rating}
              productId={productId}
              reviewCount={reviewCount}
              type="reviews-overall"
            />
            <div className="flex flex-col gap-4 mb-10 mt-6 lg:px-3.5">
              {reviewData.map(({ category, count, rating }) => {
                const { percentage } = getReviewStats(count);
                const barPercentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                const isActive = activeFilter === rating;
                return (
                  <div
                    key={category}
                    className="grid w-full lg:w-[295px] lg:grid-cols-[120px_142px_42px] grid-cols-[120px_117px_60px] md:grid-cols-[120px_280px_60px] items-center"
                  >
                    <button
                      onClick={() => handleFilterClick(rating)}
                      className={`font-medium text-base focus:outline-none focus:ring-4 focus:ring-indigo-100 text-left transition-colors hover:text-neutral-900  ${
                        isActive
                          ? "text-indigo-600 font-semibold"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {category}
                    </button>
                    <div className="w-full lg:w-[142px] h-2 bg-gray-200 rounded-xl self-center mx-2">
                      <div
                        className={`h-2 rounded-xl transition-all duration-300 ${
                          isActive ? "bg-indigo-600" : "bg-green-600"
                        }`}
                        style={{ width: `${barPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-right font-normal text-base text-neutral-600 lg:pl-7">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center h-[48px] w-[320px] lg:w-[295px] justify-self-center">
              {activeFilter !== null && (
                <button
                  onClick={clearFilter}
                  className="font-medium text-sm flex justify-center items-center px-4 py-2 rounded w-[148px] lg:w-[140px] text-indigo-700 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-100"
                >
                  Clear filter
                </button>
              )}
              <button
                className={`${activeFilter !== null ? "w-[148px] lg:w-[140px]" : "w-full lg:w-[295px]"} font-medium text-base text-neutral-900 flex justify-center items-center bg-white py-3 border-[0.5px] border-solid border-neutral-200 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1`}
              >
                Write a review
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[560px] flex flex-col justify-center align-center mt-10 lg:mt-0 lg:overflow-y-auto">
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex justify-center items-center mb-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20H0L2.92893 17.0711C1.11929 15.2614 0 12.7614 0 10ZM4.82843 18H10C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 12.1524 2.85124 14.1649 4.34315 15.6569L5.75736 17.0711L4.82843 18ZM6 11H14C14 13.2091 12.2091 15 10 15C7.79086 15 6 13.2091 6 11Z"
                        fill="#4338CA"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-xl text-center text-neutral-900 mb-2">
                    No reviews yet!
                  </p>
                  <p className="text-center text-base text-neutral-900">
                    Be the first to review this product
                  </p>
                </div>
              ) : (
                filteredReviews.slice(0, resultsPerPage).map((review) => (
                  <div key={`${review.user_id}-${review.created_at}`}>
                    <div className="flex items-center gap-2 mb-2 justify-between">
                      <div className="flex gap-4">
                        {dataService.getUsers(review.user_id)?.avatar_url ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={
                              dataService.getUsers(review.user_id)?.avatar_url
                            }
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xl">
                            {(() => {
                              const user = dataService.getUsers(review.user_id);
                              if (user?.name) {
                                const nameParts = user.name.split(" ");
                                if (nameParts.length >= 2) {
                                  return nameParts[0][0] + nameParts[1][0];
                                } else if (nameParts.length === 1) {
                                  return nameParts[0][0];
                                }
                              }

                              return review.user_id.slice(0, 2);
                            })()}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div>
                            {capitalizeWords(review.user_id.replace(/-/g, " "))}
                          </div>
                          <StarRating
                            rating={review.rating}
                            maxStars={5}
                            type="reviews"
                          />
                        </div>
                      </div>
                      <span className="text-xs text-neutral-600 self-start">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))
              )}
              {hasMoreReviews && (
                <button
                  onClick={handleMoreReviews}
                  className="font-medium text-base text-neutral-900 flex justify-center items-center justify-self-center gap-1.5 bg-white px-5 py-3 border-[0.5px] border-solid border-neutral-200 w-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1"
                >
                  Show {Math.min(12, filteredReviews.length - resultsPerPage)}{" "}
                  more review
                  {Math.min(12, filteredReviews.length - resultsPerPage) !== 1
                    ? "s"
                    : ""}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;

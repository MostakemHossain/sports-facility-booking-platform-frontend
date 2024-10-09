/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Carousel, Rate, Skeleton } from "antd";
import { useGetAllReviewsQuery } from "../redux/features/review/review.api";

const Testimonial = () => {
  const { data, isLoading } = useGetAllReviewsQuery("");

  if (isLoading) {
    return <Skeleton active />;
  }

  const reviews = data?.data || [];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">
        What Our Clients Say
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Hear from our satisfied customers about their experiences at our sports
        facility.
      </p>
      <Carousel autoplay dots={true} effect="scrollx">
        {reviews.map((review: any, index: number) => (
          <div key={index} className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <Avatar
                size={80}
                src={review?.userId?.photo}
                alt={review?.userId?.name}
                style={{ marginBottom: "1rem", border: "2px solid white" }}
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {review?.userId?.name}
              </h3>
              <Rate allowHalf value={review.rating} disabled />
              <p className="mt-2 italic text-gray-100 text-center flex-grow">{`"${review?.review}"`}</p>
              <div className="mt-auto text-center">
                <span className="text-sm opacity-75">
                  Reviewed on: {new Date(review?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;

import { Button, Rate } from "antd";
import { FaEdit, FaQuoteLeft, FaQuoteRight, FaTrash } from "react-icons/fa";

interface ReviewCardProps {
  review: {
    _id: string;
    name: string;
    email: string;
    rating: number;
    review: string;
    createdAt: string;
  };
  onEdit: (reviewId: string) => void;
  onDelete: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onEdit,
  onDelete,
}) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="flex flex-col items-center p-2 border border-gray-200 rounded-lg shadow-md  transition-transform duration-200 ">
      <img
        src="https://via.placeholder.com/50" 
        alt="User"
        className="rounded-full mb-4 mt-2"
      />
      <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
      
      <Rate disabled value={review.rating} className="mb-2" />
      <p className="text-gray-700 text-center italic flex items-center">
        <FaQuoteLeft className="text-black mr-1" size={30} />
        {review.review}
        <FaQuoteRight className="text-black ml-1" size={30} />
      </p>
      <p className="text-gray-400 text-sm">{formattedDate}</p>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          type="link"
          onClick={() => onEdit(review._id)}
          icon={<FaEdit />}
          className="text-blue-500 hover:text-blue-700"
        />
        <Button
          type="link"
          danger
          onClick={() => onDelete(review._id)}
          icon={<FaTrash />}
          className="hover:text-red-700"
        />
      </div>
    </div>
  );
};

export default ReviewCard;

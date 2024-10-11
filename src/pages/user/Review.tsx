/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Rate, Skeleton, Table, Tabs } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SHForm from "../../components/form/SHForm";
import SHInput from "../../components/form/SHInput";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetMyReviewsByIdQuery,
  useUpdateReviewMutation,
} from "../../redux/features/review/review.api";
import { useAppSelector } from "../../redux/hooks";

const reviewSchema = z.object({
  review: z
    .string()
    .min(10, "Review message must be at least 10 characters long.")
    .max(300, "Review message cannot exceed 300 characters.")
    .optional(),
  rating: z
    .number()
    .min(0, "Rating must be at least 0.")
    .max(5, "Rating cannot exceed 5.")
    .optional(),
});

const Review = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [ratingInput, setRatingInput] = useState<string | undefined>(undefined);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<string | null>(null);
  const [currentReview, setCurrentReview] = useState<{
    id: string;
    review: string;
    rating: number;
  } | null>(null);

  const user = useAppSelector(useCurrentUser);
  const [createReview] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  const { data, isLoading } = useGetMyReviewsByIdQuery(user?.id);
  if (isLoading) {
    return <Skeleton />;
  }

  const onSubmit = async (data: FieldValues) => {
    const newReview = {
      name: user?.name,
      email: user?.email,
      review: data?.review,
      userId: user?.id,
      rating: rating !== undefined ? rating : 0,
    };
    try {
      const res = await createReview(newReview).unwrap();
      if (res?.success) {
        toast.success(res?.message, { className: "custom-toast" });
        setActiveTab("2"); 
      }
    } catch (error: any) {
      toast.error(error.data.message, { className: "custom-toast" });
    }
  };

  const handleRatingChange = (value: string) => {
    setRatingInput(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5) {
      setRating(numericValue);
    } else {
      setRating(undefined);
    }
  };

  const handleEdit = (
    reviewId: string,
    reviewText: string,
    reviewRating: number
  ) => {
    setCurrentReview({
      id: reviewId,
      review: reviewText,
      rating: reviewRating,
    });
    setRating(reviewRating);
    setUpdateModalVisible(true);
  };

  const handleDelete = (reviewId: string) => {
    setReviewIdToDelete(reviewId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (reviewIdToDelete) {
      try {
        const res = await deleteReview(reviewIdToDelete).unwrap();
        if (res?.success) {
          toast.success(res?.message, { className: "custom-toast" });
        }
      } catch (error: any) {
        toast.error(error.data.message, { className: "custom-toast" });
      } finally {
        setDeleteModalVisible(false);
        setReviewIdToDelete(null);
      }
    } else {
      console.error("Review ID is undefined!");
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setReviewIdToDelete(null);
  };

  const handleUpdate = async (data: FieldValues) => {
    if (currentReview) {
      const updatedReview = {
        id: currentReview.id,
        review: data.review || currentReview.review,
        rating: rating !== undefined ? rating : currentReview.rating,
      };

      try {
        const res = await updateReview(updatedReview).unwrap();
        if (res?.success) {
          toast.success(res?.message, { className: "custom-toast" });
        }
      } catch (error: any) {
        toast.error(error.data.message, { className: "custom-toast" });
      } finally {
        setUpdateModalVisible(false);
        setCurrentReview(null);
        setRating(undefined);
      }
    }
  };

  const cancelUpdate = () => {
    setUpdateModalVisible(false);
    setCurrentReview(null);
    setRating(undefined);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text: number) => <Rate disabled value={text} />,
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        new Date(text).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleEdit(record.key, record.review, record.rating)}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const tableData = data?.data?.map((review: any) => ({
    key: review._id,
    name: review.name,
    email: review.email,
    rating: review.rating,
    review: review.review,
    createdAt: review.createdAt,
  }));

  return (
    <div className="review-section-container">
      <h2 className="text-center text-4xl text-orange-600 font-bold mb-6">Reviews</h2>

      <Tabs activeKey={activeTab} defaultActiveKey="1">
        <Tabs.TabPane
          tab={<span className="text-orange-600" onClick={() => setActiveTab("1")}>Leave a Review</span>}
          key="1"
        >
          <SHForm onSubmit={onSubmit} resolver={zodResolver(reviewSchema)}>
            <SHInput
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              defaultValue={user?.name || ""}
            />

            <SHInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email || ""}
            />

            <div className="rating-section">
              <label className="font-semibold">Rating</label>
              <div>
                <SHInput
                  name="rating"
                  label=""
                  type="number"
                  value={ratingInput}
                  placeholder="Enter a rating (e.g., 3.5)"
                  onChange={(e) => handleRatingChange(e.target.value)}
                />

                <Rate
                  className="mb-5"
                  allowHalf
                  value={rating}
                  onChange={(value) => {
                    setRating(value);
                    setRatingInput(value?.toString());
                  }}
                />
              </div>
            </div>

            <SHInput
              name="review"
              label="Your Review"
              type="text"
              placeholder="Write your review here..."
            />

            <Button  type="primary" htmlType="submit" className="mt-4 bg-orange-600 hover:bg-orange-700">
              Submit Review
            </Button>
          </SHForm>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={<span className="text-orange-600" onClick={() => setActiveTab("2")}>My Reviews</span>}
          key="2"
        >
          <Table columns={columns} dataSource={tableData} pagination={false} />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title="Delete Confirmation"
        visible={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
      >
        <p>Are you sure you want to delete this review?</p>
      </Modal>

      <Modal
        title="Update Review"
        visible={isUpdateModalVisible}
        onOk={handleUpdate}
        onCancel={cancelUpdate}
      >
        <SHForm
          onSubmit={handleUpdate}
          resolver={zodResolver(reviewSchema)}
          defaultValues={{
            review: currentReview?.review || "",
            rating: currentReview?.rating || 0,
          }}
        >
          <SHInput
            name="review"
            label="Your Review"
            type="text"
            placeholder="Write your review here..."
          />
          <Rate
            allowHalf
            value={rating}
            onChange={(value) => {
              setRating(value);
            }}
          />
        </SHForm>
      </Modal>
    </div>
  );
};

export default Review;

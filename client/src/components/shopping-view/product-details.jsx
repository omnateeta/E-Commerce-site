import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews, isLoading, error } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "warning",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
          variant: "success",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setIsSubmitting(false);
  }

  const handleAddReview = async () => {
    if (!reviewMsg.trim() || rating === 0) {
      toast.error("Please provide both rating and review message");
      return;
    }

    setIsSubmitting(true);
    try {
      const formdata = {
        productId: productDetails?._id,
        rating: rating,
        message: reviewMsg,
      };
      await dispatch(addReview(formdata)).unwrap();
      toast.success("Review added successfully!");
      setRating(0);
      setReviewMsg("");
      dispatch(getReviews(productDetails?._id));
    } catch (error) {
      toast.error(error.message || "Failed to add review");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{productDetails?.title}</h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-2">
                {productDetails?.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <p
                className={`text-lg sm:text-xl md:text-2xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview} />
              </div>
              <span className="text-sm sm:text-base text-muted-foreground">
                ({averageReview.toFixed(2)})
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-4">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>

            <Separator className="my-6" />

            {/* Reviews Section */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold">Reviews</h2>
              {error && (
                <div className="text-red-500 mb-4 text-sm sm:text-base">
                  {error}
                </div>
              )}
              {isLoading ? (
                <div className="text-center py-4">Loading reviews...</div>
              ) : reviews.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {reviews.map((reviewItem) => (
                    <div key={reviewItem._id} className="flex gap-3">
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground">No Reviews</p>
              )}

              {/* Add Review Section */}
              <div className="space-y-3 mt-6">
                <Label className="text-sm sm:text-base">Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                  className="text-sm sm:text-base"
                  disabled={isSubmitting}
                />
                <Button
                  onClick={handleAddReview}
                  disabled={isSubmitting || !reviewMsg.trim() || rating === 0}
                  className="w-full text-sm sm:text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;

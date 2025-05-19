import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({
          title: "Feature image added successfully",
          className: "bg-green-500 text-white",
        });
      }
    });
  }

  function handleDeleteFeatureImage(id) {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast({
          title: "Feature image deleted successfully",
          className: "bg-red-500 text-white",
        });
      }
    });
  }

  useEffect(() => {
    console.log("Fetching feature images on component mount...");
    dispatch(getFeatureImages()).then((result) => {
      console.log("Feature images fetch result:", result);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("Current feature image list:", featureImageList);
  }, [featureImageList]);

  console.log(featureImageList, "featureImageList");

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.userName || 'Admin'}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">$0</p>
        </div>
      </div>

      {/* Feature Image Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature Image Upload</h2>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
          Upload
        </Button>
      </div>

      {/* Feature Images Gallery */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature Images Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((featureImgItem, index) => (
                <div key={featureImgItem._id || index} className="relative rounded-lg overflow-hidden shadow-md group">
                  <img
                    src={featureImgItem.image}
                    className="w-full h-[300px] object-cover"
                    alt={`Feature image ${index + 1}`}
                    onError={(e) => {
                      console.error("Error loading image:", featureImgItem.image);
                      e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            : <p className="text-gray-500">No feature images uploaded yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

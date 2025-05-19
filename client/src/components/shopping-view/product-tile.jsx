import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full h-full flex flex-col">
      <div onClick={() => handleGetProductDetails(product?._id)} className="flex-1">
        <div className="relative aspect-square">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-bold mb-1 sm:mb-2 line-clamp-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-sm sm:text-base font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-sm sm:text-base font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-3 sm:p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed text-sm sm:text-base">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-sm sm:text-base"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

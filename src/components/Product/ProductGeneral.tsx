import React, { useEffect, useState } from "react";

import DisplayProductData from "./DisplayProductData";
import Metadata from "../Metadata";
import { useParams } from "react-router-dom";
import ProductService from "../../services/product.service";

const ProductGeneral: React.FC = () => {
  const [productDetails, setProductDetails] = useState<any>(null); // State to hold product details
  const { productId } = useParams<{ productId: string }>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          // Check if productId is defined
          const details = await ProductService.getProductDetailsGeneral(
            productId
          );
          setProductDetails(details); // Set productDetails state when data is fetched
          console.log("product details", details);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call the fetchData function
  }, [productId]);

  return (
    <>
      <Metadata />
      {productDetails && <DisplayProductData data={productDetails} />}{" "}
      {/* Render DisplayProductData only when productDetails is available */}
    </>
  );
};

export default ProductGeneral;

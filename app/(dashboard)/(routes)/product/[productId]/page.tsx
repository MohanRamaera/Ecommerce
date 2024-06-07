import Gallery from "@/components/gallery";
import Info from "@/components/info";
import Container from "@/components/ui/container";
import prismadb from "@/lib/prismadb";
import React from "react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  // const product = getProduct(params.productId);
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      Image: true,
      category:true
    },
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product?.Image} />
            <div className="px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              {product && <Info data={product} />}
            </div>
          </div>
          <hr className="my-10" />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;

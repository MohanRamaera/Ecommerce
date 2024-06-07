import { ProductClientUI } from "./components/clientUI";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import getProducts from "@/actions/get-products";
import prismadb from "@/lib/prismadb";

const ProductPageAdmin = async () => {


  const products= await getProducts()
  const formattedProducts: ProductColumn[] = products?.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(Number(item.price)),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <ProductClientUI data={formattedProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductPageAdmin;

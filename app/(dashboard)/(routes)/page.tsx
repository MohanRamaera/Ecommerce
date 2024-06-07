import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import ProductList from "@/components/ui/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const products=await getProducts()
  const billboard = await getBillboard('60322adf-9b74-4db4-bd61-f0a01ef60b2a');

  return (
    <>
      <Navbar />
      <Container>
        <div className="pb-10 space-y-10">
          <Billboard data={billboard} />
          <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;

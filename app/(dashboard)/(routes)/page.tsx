import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import ProductList from "@/components/ui/product-list";
import prismadb from "@/lib/prismadb";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("df0e09f1-ec53-4f56-96b8-6414c467f7af");

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

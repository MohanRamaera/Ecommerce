import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import ProductList from "@/components/ui/product-list";
import prismadb from "@/lib/prismadb";

export const revalidate = 0;

const HomePage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      Image: true,
    },
  });
  return (
    <>
      <Navbar />
      <Container>
        <div className="pb-10 space-y-10">
          <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;

import prismadb from "@/lib/prismadb";

export const getProduct = async (productId: string) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Image: true,
    },
  });

  return product;
};



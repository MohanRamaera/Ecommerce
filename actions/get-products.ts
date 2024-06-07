import prismadb from "@/lib/prismadb";

export const getProducts = async () => {
  const products = await prismadb.product.findMany({
    include: {
      Image: true,
      category:true,
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  return products
};


export default getProducts
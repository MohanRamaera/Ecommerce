import prismadb from "@/lib/prismadb";


export const getAllOrders = async () => {
  const allOrders = await prismadb.order.findMany({
  });

  return allOrders;
};


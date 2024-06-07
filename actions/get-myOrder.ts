import { useCurrentUser } from "@/hooks/use-current-user";
import prismadb from "@/lib/prismadb";


export const getMyOrders = async (userId:string|undefined) => {
  const myOrders = await prismadb.order.findMany({
    where: {
     userId
    }
    
  });

  return myOrders;
};


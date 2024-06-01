import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  id: string;

  name: string;
  price: Decimal;
  isFeatured: boolean;

  Image: Image[];
}

export interface Image {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

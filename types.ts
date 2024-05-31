export interface Product {
  id: string;

  name: string;
  price: string;
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

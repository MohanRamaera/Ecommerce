

export interface Product {
    id: string;
   
    name: string;
    price: string;
    isFeatured: boolean;
   
    
    images: Image[]
}

export interface Image {
    id: string;
    url: string;
}


declare namespace ECS {
  interface Product {
    id: string;
    description: string;
    name: string;
    options: ECS.Option[];
  }

  interface Option {
    price: number;
    salePrice?: number;
    discount?: number;
    varients: {
      [key: string]: any[];
    };
  }
}
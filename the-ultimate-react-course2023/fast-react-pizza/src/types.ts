export type cartItemType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type pizzaType = {
  id: string;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

export type orderType = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: cartItemType[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status?: string;
};

export type orderFormErrors = {
  phone?: string;
};

export type cartItemType = {
  pizzaId: number | string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type pizzaType = {
  id: number | string;
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

export type PositionType = {
  latitude: string;
  longitude: string;
};

export interface RootState {
  user: {
    username: string;
    status: string;
    position: PositionType;
    address: string;
    error: string;
  };
  cart: {
    cart: cartItemType[];
  };
}

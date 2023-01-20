import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[]; // Sera un Array de ICartProduct
  numberOfItems: number;
  subTotal: number;
  taxCart: number;
  total: number;
  shippingAddress?: ShippingAddress;

  //!Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeItem: (product: ICartProduct) => void;
  updateAddress: (adress: ShippingAddress) => void;
  createOrder: () => Promise<void>
}

export const CartContext = createContext({} as ContextProps);

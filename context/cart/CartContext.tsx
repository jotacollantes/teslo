import { createContext } from "react";
import { ICartProduct } from "../../interfaces";
import { FormData as FormDataAddress } from "../../pages/checkout/address";
FormData
interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[]; // Sera un Array de ICartProduct
  numberOfItems: number;
  subTotal: number;
  taxCart: number;
  total: number;
  shippingAddress?: FormDataAddress;

  //!Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeItem: (product: ICartProduct) => void;
  updateAddress: (adress: FormDataAddress) => void;
}

export const CartContext = createContext({} as ContextProps);

import { ICartProduct, ShippingAddress } from "../../interfaces";
import { CartState } from "./";


interface SummaryType {
  numberOfItems: number;
  subTotal: number;
  taxCart: number;
  total: number;
}

type CartActionType =
  | { type: "[Cart] - LoadCart from cookies", payload: ICartProduct[] }
  | { type: "[Cart] - Add Product", payload: ICartProduct[] }
  | { type: "[Cart] - Update Cart Quantity", payload: ICartProduct }
  | { type: "[Cart] - Remove product in cart", payload: ICartProduct }
  | { type: "[Cart] - Update Summary", payload: SummaryType }
  | { type: "[Cart] - LoadAddress from cookies", payload: ShippingAddress|undefined }
  | { type: "[Cart] - Update Address", payload: ShippingAddress|undefined }
  ;

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies":
      //console.log('entro al reducer: [Cart] - LoadCart from cookies',action.payload)
      return {
        
        ...state,
        //cart: action.payload,
        isLoaded:true,
        cart: [...action.payload]
      };
    //break;
    case "[Cart] - Add Product":
      //console.log('entro al reducer: [Cart] - Add Product',action.payload)
      return {
        //!Propago todas las propiedades del estado
        ...state,
        //Sobreescribo la propiedad cart, propago todos los todo que estan dentro del payload.
        //isLoaded:true,
        cart: action.payload,
      };
    case "[Cart] - Update Cart Quantity":
      return {
        //!Propago todas las propiedades del estado
        ...state,

        cart: state.cart.map((product) => {
          //!Para identificar el producto que se va a reemplazar
          if (
            product._id === action.payload._id &&
            product.size === action.payload.size
          ) {
            return action.payload;
          } else {
            return product;
          }
        }),
      };
    case "[Cart] - Remove product in cart":
      const newCart = state.cart.filter((product) => {
        if (
          product._id === action.payload._id &&
          product.size === action.payload.size
        ) {
          return false;
        }
        return true;
      });
      console.log(newCart);
      return {
        //!Propago todas las propiedades del estado
        ...state,
        cart: newCart,
      };
      case "[Cart] - Update Summary":
      return {
        ...state,
        //*Propago las propiedades payload que tiene las propiedades del payload que tiene los valores del summary
        ...action.payload
      };

      case "[Cart] - LoadAddress from cookies":
      case "[Cart] - Update Address":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    //break;

    default:
      return state;
  }
};
